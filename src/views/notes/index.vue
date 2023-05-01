<template>
  <Modal
      width="520"
      :visible="replyConfig.visible"
      @cancel="handleCancel"
      @ok="handleReply"
      :title="replyConfig.title"
      :unmount_on_close="true"
  >
    <a-form :model="requestData" @submit="handleReply">
      <a-form-item
          field="content"
          :hide-asterisk="true"
          :hide-label="true"
          :rules="[{ required: true, message: '请写点什么吧' }]"
          :validate-trigger="['blur']"
      >
        <a-textarea
            placeholder="请写下来吧"
            :max-length="3000"
            show-word-limit
            v-model="requestData.content"
        />
      </a-form-item>
      <a-form-item :hide-asterisk="true" :hide-label="true">
        <a-button
            :loading="replyConfig.loading"
            html-type="submit"
            type="primary"
        >回复</a-button
        >
      </a-form-item>
    </a-form>
  </Modal>
  <div class="header">
    <div class="header_text">帖子详情</div>
  </div>
  <div class="container">
    <a-spin v-if="isLoading" class="loading" />
    <article v-else class="article">
      <a class="avatar">
        <img :src="noteData.note.user.avatar" class="inner" />
      </a>
      <div class="main">
        <div class="main_header">
          <a class="name" :href="'/@' + noteData.note.name">{{
            noteData.note.user.nick_name == ""
              ? noteData.note.name
              : noteData.note.user.nick_name
          }}</a>
          <div class="username">@{{ noteData.note.name }}</div>
          <div class="info">
            <time :title="getTime(noteData.note.created_at)">
              {{ getDuration(noteData.note.created_at) }}
            </time>
          </div>
        </div>
        <div class="body">
          <div class="content">
            <div class="text">
              {{ noteData.note.content }}
            </div>
          </div>
          <!--文章图片-->
          <div class="pictures">
            <a-image-preview-group>
              <a-image
                  v-for="picture in noteData.note.pictures"
                  :width="noteData.note.pictures.length>1?'200':'100%'"
                  style="margin: 5px"
                  :src="picture.url"
                  show-loader
              />
            </a-image-preview-group>
          </div>
        </div>
        <div class="footer">
          <!-- 回复/评论 -->
          <button @click="openModal(noteData.note)">
            <icon-reply size="18" />
          </button>
          <!-- 点赞/取消点赞 -->
          <button @click="handleLike(noteData.note)">
            <icon-thumb-up v-if="!noteData.note.isLiked" size="18" />
            <icon-thumb-up-fill v-else size="18" />
          </button>
          <!-- 更多 -->
          <Popover trigger="click" position="bottom">
            <template v-slot:default>
              <button>
                <icon-more size="18" />
              </button>
            </template>
            <template v-slot:content>
              <a class="pop_item" :href="'/notes/' + noteData.note.note_id">
                <icon-info-circle />详情
              </a>
              <a class="pop_item" @click="handleCopy(noteData.note.content)">
                <icon-copy />复制内容
              </a>
              <!--                <a class="pop_item" @click="handleCopy(item.content)">-->
              <!--                  <icon-attachment />复制链接-->
              <!--                </a>-->
            </template>
          </Popover>
        </div>
      </div>
    </article>
    <div>
      <a-list-item v-for="item of commentData" class="item">
        <article class="article">
          <a class="avatar">
            <img :src="item.user.avatar" class="inner" />
          </a>
          <div class="main">
            <div class="main_header">
              <a class="name" :href="'/@' + item.user.name">{{
                item.user.nick_name == "" ? item.user.name : item.user.nick_name
              }}</a>
              <div class="username">@{{ item.user.name }}</div>
              <div class="info">
                <time :title="getTime(item.created_at)">
                  {{ getDuration(item.created_at) }}
                </time>
              </div>
            </div>
            <div class="body">
              <div class="content">
                <div class="text">
                  {{ item.content }}
                </div>
              </div>
            </div>
          </div>
        </article>
      </a-list-item>
    </div>
  </div>
  <div v-if="!commentData.length" style="color: #dee7e4; text-align: center;background: none!important;">暂无评论~</div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router/dist/vue-router";
import { getDuration, getTime } from "@/utils/date";
import Popover from "@/components/Popover/index.vue";
import { useNoteStore } from "@/stores/modules/note";
import {
  IconThumbUp,
  IconThumbUpFill,
  IconReply,
  IconMore,
  IconCopy,
  IconInfoCircle,
} from "@arco-design/web-vue/es/icon";
import { useEventStore } from "@/stores/modules/event";

import { Message } from "@arco-design/web-vue";
const noteStore = useNoteStore();
const eventStore = useEventStore();
const isLoading = ref(false);
let noteData = reactive({
  note: {
    content: "",
    created_at: "",
    isLiked: 0,
    name: "",
    note_id: "",
    user: {
      name: "",
      nick_name: "",
      notes_count: 0,
      describe: "",
      avatar: "",
      banner: "",
      created_at: "",
    },
  },
});
const commentData = reactive<Array<String>>([]);
const handleLike = async (item: any) => {
  const res = await eventStore.like({
    note_id: item.note_id,
  });
  if (res) {
    item.isLiked = !item.isLiked;
  }
};
const handleCopy = (text: string) => {
  navigator.clipboard.writeText(text).catch((e) => console.error(e));
  Message.success("复制成功");
};
const getReply = async (note_id: string) => {
  const eventStore = useEventStore();
  const res = await eventStore.getReply({
    note_id: note_id,
  });
  if (res) {
    commentData.push(...res.events);
    console.log(commentData);
    return;
  }
  Message.error("获取评论失败");
};

//Modal的相关配置
const replyConfig = reactive({
  visible: false,
  loading: false,
  title: "回复@",
});

//帖子的表单数据
const requestData = reactive({
  note_id: "",
  content: "",
});

const openModal = (item: any) => {
  replyConfig.visible = true;
  replyConfig.title = "回复@"+item.name;
  requestData.content = "";
  requestData.note_id = item.note_id;
};

const handleReply = async () => {
  const res = await eventStore.reply(requestData);
  replyConfig.visible = false;
  if (res) {
    Message.success("回复成功");
    let timer=setTimeout(function (){
      //刷新页面
      location.reload()
      clearTimeout(timer)
    },1500)
    return;
  }
  Message.error("回复失败");
};

const handleCancel = () => {
  replyConfig.visible = false;
};

onMounted(async () => {
  const router = useRouter();
  const note_id = router.currentRoute.value.path.slice(7);
  isLoading.value = true;
  const res = await noteStore.getNoteById({
    note_id: note_id,
  });
  isLoading.value = false;
  if (res) {
    noteData.note = res.note;
    getReply(note_id);
    console.log(noteData);
    return;
  }
  router.push("/404");
});
</script>

<style scoped lang="less">
.header {
  padding: 14px 20px;
  height: 58px!important;
  display: flex;
  border-bottom: solid 0.5px rgba(231, 255, 251, 0.14);
  .header_text {
    font-weight: 700;
    font-size: 14px;
    color: #dee7e4;
    line-height: 30px;
    //margin: 16px;
  }
}

.article {
  display: flex;
  padding: 28px 32px 18px;
  color: #dee7e4;

  //border-bottom: solid 0.5px rgba(231, 255, 251, 0.14);
  .avatar {
    display: block;
    border-radius: 100%;
    position: sticky;
    left: 0;
    line-height: 16px;
    vertical-align: bottom;
    margin: 0 10px 8px 0;
    width: 58px;
    height: 58px;
    top: calc(14px + 56px, 0px);
    .inner {
      position: absolute;
      inset: 0;
      border-radius: 100%;
      z-index: -1;
      overflow: hidden;
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }
  .main {
    flex: 1;
    min-width: 0;
    .main_header {
      display: flex;
      align-items: baseline;
      white-space: nowrap;
      .name {
        flex-shrink: 1;
        display: block;
        margin: 0 0.5em 0 0;
        padding: 0;
        overflow: hidden;
        font-size: 1em;
        font-weight: 700;
        text-decoration: none;
        text-overflow: ellipsis;
      }
      .username {
        flex-shrink: 9999999;
        margin: 0 0.5em 0 0;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .info {
        flex-shrink: 0;
        margin-left: auto;
        font-size: 0.9em;
      }
    }
    .body {
      text-align: left;
      .content {
        .text {
          overflow-wrap: break-word;
        }
      }
    }
    .footer {
      color: rgb(162, 171, 168);
      text-align: left;
      button {
        margin-top: 18px;
        margin-right: 28px;
      }
      :hover {
        color: white;
      }
    }
  }
}
.pop_item {
  display: block;
  padding: 6px 16px;
  min-width: 200px;
  line-height: 20px;
  position: relative;
  box-sizing: border-box;
  white-space: nowrap;
  text-align: left;
  overflow: auto;
  text-overflow: ellipsis;
  color: #dee7e4;
  font-size: 0.9em;
  :deep(.arco-icon) {
    margin-right: 5px;
    width: 20px;
  }
}
.item {
  padding: 0 0 0 25px !important;
  border-top: solid 0.5px rgba(231, 255, 251, 0.14) !important;
  margin: 0 !important;
  //background: rgb(25, 35, 32);
  width: 100%;
}

.container{
  margin: 0 auto 25px;
  max-width: 849px;
  padding: 0 24px;
  background: rgb(25, 35, 32);
}
</style>
