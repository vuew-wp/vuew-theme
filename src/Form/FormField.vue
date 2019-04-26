<template>
  <div :class="inputStateChangeClass" class="uk-margin-bottom">
    <label class="uk-form-label" v-if="field.label">
      <span v-text="field.label"></span>
      <input
        class="uk-input"
        :type="field.type"
        :placeholder="field.placeholder"
        :name="field.id"
        v-on:input="validate($event.target.value, field)"
        v-on:focus="touched = true"
      />
    </label>
    <span v-if="field.desc" v-html="field.desc" class="uk-text-small"></span>
  </div>
</template>

<script>
import formFields from './form-field-types';

export default {
  props: ['field'],
  data() {
    return {
      json: {},
      valid: false,
      touched: false,
    };
  },
  mounted() {
    this.json = Object.assign({}, formFields[this.field.type], this.field);
  },
  computed: {
    inputStateChangeClass() {
      const vm = this;

      if (!this.field.required || !vm.touched) {
        return '';
      }
      if (vm.valid) {
        return 'uk-form-success';
      }
      return 'uk-form-danger';
    },
  },
  methods: {
    validate(value, field) {
      const vm = this;
      const validateMethod = vm.json['validate_callback'];

      this.$emit('input', {
        value: value,
        id: field.id,
        valid: vm[validateMethod](value),
      });
    },
    validText(value) {
      this.valid = '' !== value;
      return this.valid;
    },
    validEmail(value) {
      this.valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      return this.valid;
    },
    validTextarea(value) {
      this.valid = '' !== value;
      return this.valid;
    },
  },
};
</script>
