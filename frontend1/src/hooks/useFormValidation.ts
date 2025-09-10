import { useState, useCallback } from 'react';

interface ValidationRules {
  [key: string]: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    custom?: (value: any) => boolean;
    errorMessage?: string;
  };
}

interface ValidationErrors {
  [key: string]: string;
}

export const useFormValidation = (rules: ValidationRules) => {
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  const validateField = useCallback((name: string, value: any) => {
    if (!rules[name]) return '';

    const rule = rules[name];
    
    if (rule.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
      return rule.errorMessage || 'This field is required';
    }
    
    if (rule.minLength && typeof value === 'string' && value.length < rule.minLength) {
      return rule.errorMessage || `Minimum length is ${rule.minLength} characters`;
    }
    
    if (rule.maxLength && typeof value === 'string' && value.length > rule.maxLength) {
      return rule.errorMessage || `Maximum length is ${rule.maxLength} characters`;
    }
    
    if (rule.pattern && typeof value === 'string' && !rule.pattern.test(value)) {
      return rule.errorMessage || 'Invalid format';
    }
    
    if (rule.custom && !rule.custom(value)) {
      return rule.errorMessage || 'Invalid value';
    }
    
    return '';
  }, [rules]);

  const validateForm = useCallback((formData: any) => {
    const newErrors: ValidationErrors = {};
    let isValid = true;
    
    Object.keys(rules).forEach(fieldName => {
      const error = validateField(fieldName, formData[fieldName]);
      if (error) {
        newErrors[fieldName] = error;
        isValid = false;
      }
    });
    
    setErrors(newErrors);
    return isValid;
  }, [rules, validateField]);

  const handleBlur = useCallback((fieldName: string) => {
    setTouched(prev => ({ ...prev, [fieldName]: true }));
  }, []);

  const validateFieldOnChange = useCallback((name: string, value: any) => {
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  }, [touched, validateField]);

  return {
    errors,
    validateForm,
    validateField,
    validateFieldOnChange,
    handleBlur,
    setTouched,
  };
};