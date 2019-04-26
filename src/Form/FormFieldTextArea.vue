<template>
  <div :class="inputStateChangeClass" class="uk-margin-bottom">
    <label class="uk-form-label" v-if="field.label">
      <span v-text="field.label"></span>
      <textarea
        class="uk-input"
        :type="field.type"
        :placeholder="field.placeholder"
        :name="field.id"
        v-on:input="validate($event.target.value, field)"
        v-on:focus="touched = true"
      >
      </textarea>
    </label>
    <span v-if="field.desc" v-html="field.desc" class="uk-text-small"></span>
  </div>
</template>

<script>
import formFields from './form-field-types';
import FormField from './FormField';

export default {
  mixins: [FormField],
  name: 'FormFieldTextArea',
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
    validTextArea(value) {
      this.valid = '' !== value;
      return this.valid;
    },
  },
};
</script>
