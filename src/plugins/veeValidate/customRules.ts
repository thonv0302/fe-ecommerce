import { defineRule } from 'vee-validate';

export function defineAddressRules() {
  defineRule('required', (value: string) => {
    if (!value || !value.length) {
      return 'This field is required';
    }

    return true;
  });
  defineRule('email', (value: string) => {
    // Field is empty, should pass
    if (!value || !value.length) {
      return true;
    }
    // Check if email
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
      return 'This field must be a valid email';
    }
    return true;
  });

  defineRule('minLength', (value: any, [limit]: any[]) => {
    // The field is empty so it should pass
    if (!value || !value.length) {
      return true;
    }
    if (value.length < limit) {
      return `This field must be at least ${limit} characters`;
    }
    return true;
  });

  defineRule('maxLength', (value: any, [limit]: any[]) => {
    // The field is empty so it should pass
    if (!value || !value.length) {
      return true;
    }
    if (value.length > limit) {
      return `This field must be less than ${limit} characters`;
    }
    return true;
  });

  defineRule('confirmed', (value: any, [target]: any[]) => {
    if (value === target) {
      return true;
    }
    return 'Passwords must match';
  });

  defineRule('phone', (value: string) => {
    // Field is empty, should pass
    if (!value || !value.length) {
      return true;
    }

    // Check if phone
    if (!/\d{9,11}$/.test(value)) {
      return 'This field must be a valid phone';
    }
    return true;
  });
}
