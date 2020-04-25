<template>
  <div class="home" >
    <BannerHeader />
    <FormHeader text="Sign Up" />
    <form>
      <TextInput label="Email" v-model="email"/>
      <TextInput label="Password" />
      <TextInput label="Password Confirmation" />
      <SubmitButton
        label="Submit"
        path="/api/v1/users"
        @submitted="handleSubmit"
      />
      <RedirectDisclaimer
        messageText="Already have an account?"
        linkText="Log in here."
        href="/login"
      />
    </form>
  </div>
</template>

<script>
import BannerHeader from '@/components/BannerHeader.vue';
import FormHeader from '@/components/FormHeader.vue';
import TextInput from '@/components/TextInput.vue';
import SubmitButton from '@/components/SubmitButton.vue';
import RedirectDisclaimer from '@/components/RedirectDisclaimer.vue';
import UsersController from '@/api/v1/controllers/UsersController';

export default {
  name: 'Home',
  components: {
    BannerHeader,
    FormHeader,
    SubmitButton,
    TextInput,
    RedirectDisclaimer,
  },
  data: () => ({
    email: String,
  }),
  methods: {
    handleSubmit() {
      console.log('submit called');
      debugger;
      UsersController.create({
        email: this.email,
      });
    },
  },
};
</script>

<style scoped>
</style>
