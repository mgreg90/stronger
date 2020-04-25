<template>
  <div class="home" >
    <BannerHeader />
    <FormHeader text="Sign Up" />
    <form>
      <TextInput label="Email" />
      <TextInput label="Password" />
      <TextInput label="Password Confirmation" />
      <SubmitButton type="submit" value="Submit" />
      <RedirectDisclaimer
        messageText="Already have an account?"
        linkText="Log in here."
        href="/login"
      />
    </form>
  </div>
</template>

<script>
// @ is an alias to /src
import BannerHeader from '@/components/BannerHeader.vue';
import FormHeader from '@/components/FormHeader.vue';
import TextInput from '@/components/TextInput.vue';
import SubmitButton from '@/components/SubmitButton.vue';
import RedirectDisclaimer from '@/components/RedirectDisclaimer.vue';

export default {
  name: 'Home',
  components: {
    BannerHeader,
    FormHeader,
    SubmitButton,
    TextInput,
    RedirectDisclaimer,
  },
};
</script>

<style scoped>
</style>
