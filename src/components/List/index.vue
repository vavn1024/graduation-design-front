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
  <a-list @reach-bottom="fetchData()" :scrollbar="scrollbar">
    <template #scroll-loading style="background: none">
      <div v-if="bottom" style="color: #dee7e4">没有更多内容~</div>
      <a-spin v-else class="loading" />
    </template>
    <a-list-item v-for="item of data" class="item">
      <article class="article">
        <a class="avatar">
          <img :src="item.user.avatar" class="inner" />
        </a>
        <div class="main">
          <div class="header">
            <a class="name" :href="'/@' + item.name">{{
              item.user.nick_name == "" ? item.name : item.user.nick_name
            }}</a>
            <div class="username">@{{ item.name }}</div>
            <a class="info" :href="'/notes/' + item.note_id">
              <time :title="getTime(item.created_at)">
                {{ getDuration(item.created_at) }}
              </time>
            </a>
          </div>
          <div class="body">
            <div class="content">
              <div class="text">
                {{ item.content }}
              </div>
            </div>
            <!--文章图片-->
            <div class="pictures">
              <a-image-preview-group>
              <a-image
                  v-for="picture in item.pictures"
                  :width="item.pictures.length>1?'200':'100%'"
                  :height="item.pictures.length>1?'110':'100%'"
                  style="margin: 5px"
                  :src="picture.url"
                  show-loader
              />
              </a-image-preview-group>
            </div>

          </div>
          <div class="footer">
            <!-- 回复/评论 -->
            <button @click="openModal(item)">
              <icon-reply size="18" />
            </button>
            <!-- 点赞/取消点赞 -->
            <button @click="handleLike(item)">
              <icon-thumb-up v-if="!item.isLiked" size="18" />
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
                <a class="pop_item" :href="'/notes/' + item.note_id">
                  <icon-info-circle />详情
                </a>
                <a class="pop_item" @click="handleCopy(item.content)">
                  <icon-copy />复制内容
                </a>
                <a v-if="getUserInfo().name==item.name" class="pop_item" @click="handleDelete(item.note_id)">
                  <icon-delete />删除
                </a>
              </template>
            </Popover>
          </div>
        </div>
      </article>
    </a-list-item>
  </a-list>
</template>

<script setup="props" lang="ts">
import { reactive, ref, onMounted, toRefs } from "vue";
import { useNoteStore } from "@/stores/modules/note";
import { getDuration, getTime } from "@/utils/date";
import Popover from "@/components/Popover/index.vue";
import {
  IconThumbUp,
  IconThumbUpFill,
  IconReply,
  IconMore,
  IconInfoCircle,
  IconCopy,
  IconDelete,
  IconPenFill
} from "@arco-design/web-vue/es/icon";
import Modal from "@/components/Modal/index.vue";
import { useEventStore } from "@/stores/modules/event";
import { Message } from "@arco-design/web-vue";
import {useUserStore} from "@/stores/modules/user";

//帖子的表单数据
const requestData = reactive({
  note_id: "",
  content: "",
});

//Modal的相关配置
const replyConfig = reactive({
  visible: false,
  loading: false,
  title: "回复@",
});

const props = defineProps({
  username: {
    type: String,
    default: "",
  },
});
const { username } = toRefs(props);
const requestParams = reactive({
  limit: 10,
  offset: 0,
  username: username,
});
const isRequesting = ref(false);
let bottom = ref(false);
const data = reactive<Array<String>>([]);
const isBottom = ref(false);
onMounted(() => {
  localStorage.setItem("isBottom", "false");
  window.addEventListener("setItemEvent", () => {
    isBottom.value = localStorage.getItem("isBottom") == "false" ? false : true;
    if (isBottom.value && !isRequesting.value) {
      fetchData();
    }
  });
});
const scrollbar = ref(false);
const noteStore = useNoteStore();
const eventStore = useEventStore();
const userStore=useUserStore();
const fetchData = () => {
  // console.log('reach bottom!');
  isRequesting.value = true;
  window.setTimeout(async () => {
    if (!bottom.value) {
      const res = await noteStore.local_timeline(requestParams);
      if (res) {
        requestParams.offset += requestParams.limit;
        data.push(...res.notes);
        if (data.length < requestParams.limit) {
          bottom.value = true;
        }
      } else {
        bottom.value = true;
      }
      isRequesting.value = false;
    }
  }, 200);
};

const openModal = (item: any) => {
  replyConfig.visible = true;
  replyConfig.title = "回复@"+item.name;
  requestData.content = "";
  requestData.note_id = item.note_id;
};

const handleLike = async (item: any) => {
  const res = await eventStore.like({
    note_id: item.note_id,
  });
  if (res) {
    item.isLiked = !item.isLiked;
  }
};

const handleReply = async () => {
  const res = await eventStore.reply(requestData);
  replyConfig.visible = false;
  if (res) {
    Message.success("回复成功");
    return;
  }
  Message.error("回复失败");
};

const handleCancel = () => {
  replyConfig.visible = false;
};

const handleCopy = (text: string) => {
  if (navigator.clipboard && window.isSecureContext) {
    // navigator clipboard 向剪贴板写文本
    navigator.clipboard.writeText(text).catch((e) => console.error(e));
  } else {
    // 创建text area
    let textArea = document.createElement("textarea");
    textArea.value = text;
    // 使text area不在viewport，同时设置不可见
    textArea.style.position = "absolute";
    textArea.style.opacity = "0";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    new Promise((res, rej) => {
      // 执行复制命令并移除文本框
      document.execCommand('copy') ? res : rej;
      textArea.remove();
    });
  }
  Message.success("复制成功");
};



const handleDelete = async (id:string) => {
  const res = await noteStore.delNoteById({"note_id":id})
  if (res){
    Message.success("删除成功")
    const Timer1= setTimeout(()=>{
      location.reload()
      clearTimeout(Timer1)
    },1500)
    return
  }
}


const getUserInfo = () => {
  const userInfo=JSON.parse(userStore.getInfo)
  return userInfo
}
</script>

<style scoped lang="less">
.arco-list-content {
  background: #4c5e6d !important;
}
.loading :deep(.arco-spin-icon) {
  color: #b4e900 !important;
}
.item {
  padding: 0px !important;
  border-bottom: solid 0.5px rgba(231, 255, 251, 0.14) !important;
  margin: 0 !important;
  background: rgb(25, 35, 32);
  width: 100%;
}
.article {
  display: flex;
  padding: 28px 32px 18px;
  color: #dee7e4;
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
    .header {
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
</style>

<style>
.arco-list-bordered {
  border: none;
  /*background: rgb(25, 35, 32);*/
  border-radius: 16px 16px 0 0;
}
</style>
