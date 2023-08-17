import { App } from 'vue';
import { defineRule, ErrorMessage, Field, Form } from 'vee-validate';
import AllRules from '@vee-validate/rules';
import { defineAddressRules } from './customRules';
export const veeValidatePlugin = {
  install: (app: App) => {
    app.component('VeeForm', Form);
    app.component('VeeField', Field);
    app.component('ErrorMessage', ErrorMessage);

    Object.keys(AllRules).forEach((rule) => {
      defineRule(rule, AllRules[rule]);
    });

    defineAddressRules();
  },
};
