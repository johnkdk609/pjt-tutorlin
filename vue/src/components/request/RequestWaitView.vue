<template>
  <div>
    <span v-for="counsel in waitCounselList">
      <div class="button" @click="open(counsel.id)" :key="counsel.id" v-if="loginStore.loginUser.id == counsel.menteeId">
        <div class="mentor">
          <img
            class="rounded-image"
            src="@/assets/main.jpg"
            alt="프로필 사진" />
          <h5>멘토 {{ counsel.mentorId }}</h5>
        </div>
        <div class="content">
          <h1>{{ counsel.title }}</h1>
          <h5>수락 마감 시간 : {{ counsel.acceptTime }}</h5>
        </div>
        <div class="status">
          <div :class="store.getStatusClass(counsel.status)">
            <span style="font-size: 20px; font-weight: bold;">{{ store.counselStatus[counsel.status - 1] }}</span>
          </div>
          <h5>id : {{ counsel.id }}</h5>
        </div>
      </div>
    </span>
  </div>
</template>

<script setup>
import {useCounselStore} from "@/stores/counsel";
import {useLoginStore} from "@/stores/login";
import {onMounted, computed} from "vue";

const store = useCounselStore();
const loginStore = useLoginStore();

const open = function (id) {
  const URL = "http://localhost:5173/out/counsel/wait/e/" + id;
  window.open(URL, "_blank", "width=700, height=700");
};


onMounted(() => {
  store.getCounselList();
});

const waitCounselList = computed(() => {
  return store.counselList.filter((counsel) => counsel.status === 1);
});
</script>

<style scoped>
.button > div {
  padding: 3%;
}

.mentor {
  width: 15%;
  text-align: center;
  h5 {
    margin-top: 10%;
    margin-bottom: 0%;
  }
}

.content {
  width: 70%;
  position: relative; /* 부모 요소를 기준으로 내부 요소를 위치시키기 위해 */
  h1 {
    position: absolute;
    top: 0; /* 부모 요소 상단에 배치 */
    left: 0; /* 부모 요소 좌측에 배치 */
    margin-left: 5%;
    margin-top: 70px;
  }
  h5 {
    position: absolute;
    bottom: 0; /* 부모 요소 하단에 배치 */
    left: 0; /* 부모 요소 좌측에 배치 */
    margin-left: 5%;
  }
}

.status {
  width: 15%;
  position: relative;
  div {
    position: absolute;
    right: 15%; /* 부모 요소 우측에 배치 */
    width: 100px;
    /* height: 30%; */
    border-radius: 10%;
  }
  h5 {
    position: absolute;
    bottom: 0; /* 부모 요소 하단에 배치 */
    right: 15%; /* 부모 요소 좌측에 배치 */
    margin-right: 15%;
  }
  /* 각 상태별 스타일 */
  .orange {
    background-color: rgb(255, 211, 128);
    color: white;
    font-weight: 10;
  }

  .yellowGreen {
    background-color: yellowgreen;
    color: white;
    font-weight: 10;
  }

  .gray {
    background-color: rgb(146, 146, 146);
    color: white;
    font-weight: 10;
  }
}

.rounded-image {
  border-radius: 50%; /* 50%로 설정하여 이미지를 둥글게 만듭니다. */
  width: 100px;
}

.button {
  background-color: white;
  color: black;
  border: 1px solid rgb(228, 228, 228); /* 검은색 테두리 추가 */
  text-align: center;
  cursor: pointer;
  margin: 10px;
  display: flex;
}

.button:hover {
  background-color: rgb(173, 173, 173); /* 마우스를 올렸을 때의 배경색 */
  color: rgb(146, 146, 146);
}
</style>
