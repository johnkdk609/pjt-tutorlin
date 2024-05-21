import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';
import router from '../router';

export const useLoginStore = defineStore('login', () => {
  const accessToken = ref('');
  const loginUser = ref({});

  // const login2 = (userInfo) => {
  //   axios.post('http://localhost:8080/user/login', userInfo)
  //   .then((res)=>{
  //     console.log('로그인 성공')
  //     console.log(res)
  //   })
  //   .catch(e=>{
  //     console.log('로그인 실패')
  //     console.log(e);
  //   });
  // }


  const login = async (userInfo) => {
    try {
      console.log("로그인 시도")
      console.log(userInfo)
      const res = await axios.post('http://localhost:8080/user/login', userInfo);
      accessToken.value = res.data.accessToken;
      loginUser.value = { ...userInfo, name: res.data.name };
      router.push({ name: 'home' });
    } catch (e) {
      console.log('로그인 실패');
      console.log(e);
    }
  };

  const logout = () => {
    accessToken.value = '';
    loginUser.value = {};
  };

  return { accessToken, loginUser, login, logout };
});
