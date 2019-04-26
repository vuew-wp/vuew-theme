<template>
  <div class="uk-padding-large">
    <h3 class="uk-h3" v-html="formData.title"></h3>
    <p v-html="status"></p>
    <form
      @submit.prevent="handleSubmit"
      novalidate="novalidate"
      class="uk-grid uk-form-stacked"
    >
      <div
        v-for="field in formData.properties"
        :key="field.id"
        class="uk-width-1-1"
      >
        <form-field
          v-if="'text' === field.type || 'email' === field.type"
          :field="field"
          v-on:input="handleChange"
        />

        <form-field-text-area
          v-else-if="'textarea' === field.type"
          :field="field"
          v-on:input="handleChange"
        />

        <form-field-password
          v-else-if="'password' === field.type"
          :field="field"
          v-on:input="handleChange"
        />
      </div>

      <div class="uk-width-1-1">
        <input
          type="submit"
          value="Submit"
          class="uk-button uk-button-default"
          :disabled="isDisabled"
        />
      </div>
    </form>
  </div>
</template>

<script>
import _ from 'lodash';
import { HTTP_Vuew } from '../common/http_proxy';

import FormField from './FormField';
import FormFieldPassword from './FormFieldPassword';
import FormFieldTextArea from './FormFieldTextArea';

export default {
  components: {
    FormField,
    FormFieldTextArea,
    FormFieldPassword,
  },
  mounted() {
    const requiredFields = _.filter(this.formData.properties, 'required');
    for (let i = 0, m = requiredFields.length; i < m; i++) {
      this.requiredFields[requiredFields[i].id] = {
        valid: false,
      };
    }
  },
  methods: {
    handleSubmit() {
      this.submit(this.userData);
    },
    handleChange(payload) {
      this.userData[payload.id] = payload.value;
      console.log(this.requiredFields);
      if (
        Object.prototype.hasOwnProperty.call(this.requiredFields, payload.id)
      ) {
        this.requiredFields[payload.id].valid = payload.valid;
        this.isDisabled = _.findKey(this.requiredFields, ['valid', false]);
      }
    },
    submit(params) {
      this.status = 'Submitting info...';
      params['nonce'] = this.$store.getters['user/getNonce']('userAuth');
      HTTP_Vuew.post(this.endPoint, params, {
        headers: {
          'X-WP-Nonce': this.$store.getters['user/getNonce']('wpRest'),
        },
      })
        .then(response => {
          this.status = response.data.message.text;
          this.$store.dispatch(
            'user/updateUserId',
            response.data.message.userId,
          );
          this.$store.dispatch('user/updateNonce', {
            name: 'wpRest',
            nonce: response.data.message.wpRest,
          });
          this.$store.dispatch('user/updateNonce', {
            name: 'userAuth',
            nonce: response.data.message.userAuth,
          });
        })
        .catch(error => {
          this.handleError(error.response.data);
        });
    },
    handleError(data) {
      console.log(data);
      this.status = data.message;
    },
  },
  data() {
    return {
      status: '',
      userData: {},
      formData: {},
      isDisabled: true,
      requiredFields: {},
    };
  },
};
</script>
