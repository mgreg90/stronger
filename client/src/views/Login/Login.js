import BannerHeader from '@/components/BannerHeader.vue';
import FormHeader from '@/components/FormHeader.vue';
import TextInput from '@/components/TextInput.vue';
import SubmitButton from '@/components/SubmitButton.vue';
import RedirectDisclaimer from '@/components/RedirectDisclaimer.vue';
import SessionsController from '@/api/v1/controllers/SessionsController';
import validate from '@/utils/validate';
import requestSuccessful from '@/utils/requestSuccessful';
import appStorage from '@/utils/appStorage';
import router from '@/router';

const components = {
  BannerHeader,
  FormHeader,
  SubmitButton,
  TextInput,
  RedirectDisclaimer,
};

const data = () => ({
  email: '',
  emailError: '',
  password: '',
  passwordError: '',
});

const methods = {
  validateFields() {
    const simpleValidation = {
      required: true,
      minLength: 6,
      maxLength: 40,
    };

    return validate(this, {
      email: simpleValidation,
      password: simpleValidation,
    });
  },

  async handleSubmit() {
    this.resetErrors();
    const errors = this.validateFields();

    if (errors.length) {
      errors.forEach((err) => {
        this.$set(this, `${err.field}Error`, err.message);
        console.error(err.field, err.message);
      });
      return;
    }

    const response = await SessionsController.create({
      email: this.email,
      password: this.password,
    });

    if (requestSuccessful(response)) {
      // store token
      appStorage.setToken(response.body.token);
      // navigate to home
      router.push({ path: 'home' });
    } else {
      // TODO: fire a toast with server side error
      console.error('ERROR!', response);
    }
  },

  resetErrors() {
    const errors = ['emailError', 'passwordError', 'passwordConfirmationError'];
    errors.forEach((field) => {
      this.$set(this, field, '');
    });
  },
};

export default {
  name: 'Login',
  components,
  data,
  methods,
};
