import BannerHeader from '@/components/BannerHeader.vue';
import FormHeader from '@/components/FormHeader.vue';
import TextInput from '@/components/TextInput.vue';
import AppButton from '@/components/AppButton.vue';
import RedirectDisclaimer from '@/components/RedirectDisclaimer.vue';
import UsersController from '@/api/v1/controllers/UsersController';
import validate from '@/utils/validate';
import apiUtils from '@/utils/apiUtils';
import appStorage from '@/utils/appStorage';
import router from '@/router';
import formUtils from '../../utils/formUtils';

const components = {
  BannerHeader,
  FormHeader,
  AppButton,
  TextInput,
  RedirectDisclaimer,
};

const data = () => ({
  email: '',
  emailError: '',
  password: '',
  passwordError: '',
  passwordConfirmation: '',
  passwordConfirmationError: '',
});

const handleSuccess = (response) => {
  appStorage.setToken(response.body.token);
  router.push({ path: 'history' });
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
      passwordConfirmation: {
        required: true,
        matchField: 'password',
      },
    });
  },

  async handleSubmit() {
    formUtils.clearErrors(this, ['email', 'password', 'passwordConfirmation']);
    this.resetErrors();
    const errors = this.validateFields();

    if (errors.length) {
      formUtils.setErrors(this, errors);
      return;
    }

    const response = await UsersController.create({
      email: this.email,
      password: this.password,
      passwordConfirmation: this.passwordConfirmation,
    });

    if (!apiUtils.isRequestSuccessful(response)) {
      apiUtils.handleErrors(this, response);
      return;
    }

    handleSuccess(response);
  },

  resetErrors() {
    const errors = ['emailError', 'passwordError', 'passwordConfirmationError'];
    errors.forEach((field) => {
      this.$set(this, field, '');
    });
  },
};

export default {
  name: 'SignUp',
  components,
  data,
  methods,
};
