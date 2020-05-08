import BannerHeader from '@/components/BannerHeader.vue';
import FormHeader from '@/components/FormHeader.vue';
import TextInput from '@/components/TextInput.vue';
import SubmitButton from '@/components/SubmitButton.vue';
import RedirectDisclaimer from '@/components/RedirectDisclaimer.vue';
import SessionsController from '@/api/v1/controllers/SessionsController';
import appStorage from '@/utils/appStorage';
import apiUtils from '@/utils/apiUtils';
import validate from '@/utils/validate';
import router from '@/router';
import formUtils from '../../utils/formUtils';

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

const handleSuccess = (response) => {
  appStorage.setToken(response.body.token);
  router.push({ path: 'home' });
};

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
    formUtils.clearErrors(this, ['email', 'password']);
    const errors = this.validateFields();

    if (errors.length) {
      formUtils.setErrors(this, errors);
      return;
    }

    const response = await SessionsController.create({
      email: this.email,
      password: this.password,
    });

    if (!apiUtils.requestSuccessful(response)) {
      apiUtils.handleErrors(this, response);
      return;
    }

    handleSuccess(response);
  },
};

export default {
  name: 'Login',
  components,
  data,
  methods,
};
