<template>
  <main>
    <div v-if="userStore.authenticated">
      Salut {{ userStore.user?.name }}!

      <button @click="userStore.logout" class="btn btn-block bg-red-500 text-base-100">Logout</button>
    </div>

    <form v-else v-on:submit.prevent="userStore.login(form)" class="flex flex-col gap-2">
      <label class="input input-bordered flex items-center gap-2">
        <IconMail />
        <input type="email" class="grow" placeholder="Email" v-model="form.email"/>
      </label>
      <label class="input input-bordered flex items-center gap-2">
        <IconPassword />
        <input type="password" class="grow" placeholder="Mot de passe" v-model="form.password"/>
      </label>
      <button type="submit" class="btn">Log in</button>
    </form>
  </main>
</template>

<script lang="ts" setup>
import {reactive} from 'vue'
import IconMail from "@/components/icons/IconMail.vue";
import IconPassword from "@/components/icons/IconPassword.vue";
import {useUserStore} from "@/stores/user";

const userStore = useUserStore()

const form = reactive({
  email: '',
  password: '',
})
</script>