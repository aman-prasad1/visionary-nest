// Validation rules and error messages
export const validationRules = {
  required: (value: any) => value !== null && value !== undefined && value !== '',
  email: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
  url: (value: string) => {
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  },
  minLength: (value: string, min: number) => value.length >= min,
  maxLength: (value: string, max: number) => value.length <= max,
  password: (value: string) => value.length >= 8,
  fileSize: (file: File, maxSize: number) => file.size <= maxSize,
  fileType: (file: File, allowedTypes: string[]) => allowedTypes.includes(file.type),
};

// Validation error messages
export const errorMessages = {
  required: 'This field is required',
  email: 'Please enter a valid email address',
  url: 'Please enter a valid URL',
  minLength: (min: number) => `Must be at least ${min} characters`,
  maxLength: (max: number) => `Must be no more than ${max} characters`,
  password: 'Password must be at least 8 characters',
  fileSize: (maxSize: number) => `File size must be less than ${maxSize / (1024 * 1024)}MB`,
  fileType: 'Invalid file type',
  confirmPassword: 'Passwords do not match',
  duplicate: 'This value already exists',
};

// Form field validators
export const validators = {
  fullname: (value: string) => {
    if (!validationRules.required(value)) return errorMessages.required;
    if (!validationRules.minLength(value, 3)) return errorMessages.minLength(3);
    if (!validationRules.maxLength(value, 50)) return errorMessages.maxLength(50);
    return '';
  },

  username: (value: string) => {
    if (!validationRules.required(value)) return errorMessages.required;
    if (!validationRules.minLength(value, 3)) return errorMessages.minLength(3);
    if (!validationRules.maxLength(value, 30)) return errorMessages.maxLength(30);
    if (!/^[a-zA-Z0-9_]+$/.test(value)) return 'Username can only contain letters, numbers, and underscores';
    return '';
  },

  email: (value: string) => {
    if (!validationRules.required(value)) return errorMessages.required;
    if (!validationRules.email(value)) return errorMessages.email;
    return '';
  },

  password: (value: string) => {
    if (!validationRules.required(value)) return errorMessages.required;
    if (!validationRules.password(value)) return errorMessages.password;
    return '';
  },

  confirmPassword: (value: string, password: string) => {
    if (!validationRules.required(value)) return errorMessages.required;
    if (value !== password) return errorMessages.confirmPassword;
    return '';
  },

  url: (value: string) => {
    if (value && !validationRules.url(value)) return errorMessages.url;
    return '';
  },

  requiredText: (value: string, fieldName: string) => {
    if (!validationRules.required(value)) return `${fieldName} is required`;
    return '';
  },

  file: (file: File | null, options: {
    required?: boolean;
    maxSize?: number;
    allowedTypes?: string[];
    fieldName?: string;
  } = {}) => {
    const { required = false, maxSize, allowedTypes, fieldName = 'File' } = options;

    if (required && !file) return `${fieldName} is required`;

    if (file) {
      if (maxSize && !validationRules.fileSize(file, maxSize)) {
        return errorMessages.fileSize(maxSize);
      }
      if (allowedTypes && !validationRules.fileType(file, allowedTypes)) {
        return `${fieldName} must be one of: ${allowedTypes.join(', ')}`;
      }
    }

    return '';
  },

  array: (array: any[], options: {
    required?: boolean;
    minItems?: number;
    fieldName?: string;
  } = {}) => {
    const { required = false, minItems = 1, fieldName = 'Items' } = options;

    if (required && (!array || array.length === 0)) {
      return `At least one ${fieldName.toLowerCase()} is required`;
    }

    if (array && minItems && array.length < minItems) {
      return `At least ${minItems} ${fieldName.toLowerCase()} ${minItems === 1 ? 'is' : 'are'} required`;
    }

    return '';
  },
};

// Validate entire form
export function validateForm(formData: Record<string, any>, rules: Record<string, (value: any, ...args: any[]) => string>): Record<string, string> {
  const errors: Record<string, string> = {};

  Object.entries(rules).forEach(([field, validator]) => {
    const error = validator(formData[field], formData);
    if (error) {
      errors[field] = error;
    }
  });

  return errors;
}

// Check if form has errors
export function hasErrors(errors: Record<string, string>): boolean {
  return Object.values(errors).some(error => error !== '');
}

// Validate portfolio form step
export function validatePortfolioStep(step: number, formData: any): Record<string, string> {
  const errors: Record<string, string> = {};

  switch (step) {
    case 1: // Basic Information
      errors.name = validators.fullname(formData.name);
      errors.email = validators.email(formData.email);
      break;

    case 2: // Tagline and About
      errors.aboutShort = validators.requiredText(formData.aboutShort, 'About section');
      break;

    case 3: // Social Links
      errors.github = validators.url(formData.social?.github);
      errors.linkedin = validators.url(formData.social?.linkedin);
      break;

    case 4: // Skills
      errors.skills = validators.array(formData.skills, { fieldName: 'skill' });
      if (formData.skills?.length > 0) {
        formData.skills.forEach((skill: any, index: number) => {
          if (!skill.name) {
            errors[`skill_name_${index}`] = 'Skill name is required';
          }
          if (!skill.level || skill.level < 0 || skill.level > 100) {
            errors[`skill_level_${index}`] = 'Skill level must be between 0 and 100';
          }
        });
      }
      break;

    case 5: // Projects
      errors.projects = validators.array(formData.projects, { fieldName: 'project' });
      if (formData.projects?.length > 0) {
        formData.projects.forEach((project: any, index: number) => {
          if (!project.title) {
            errors[`project_title_${index}`] = 'Project title is required';
          }
          if (!project.description) {
            errors[`project_description_${index}`] = 'Project description is required';
          }
        });
      }
      break;

    case 6: // Certificates
      errors.certificates = validators.array(formData.certificates, { fieldName: 'certificate' });
      if (formData.certificates?.length > 0) {
        formData.certificates.forEach((certificate: any, index: number) => {
          if (!certificate.name) {
            errors[`certificate_name_${index}`] = 'Certificate name is required';
          }
          if (!certificate.issuer) {
            errors[`certificate_issuer_${index}`] = 'Certificate issuer is required';
          }
        });
      }
      break;

    case 7: // Experience
      errors.experiences = validators.array(formData.experiences, { fieldName: 'experience' });
      if (formData.experiences?.length > 0) {
        formData.experiences.forEach((experience: any, index: number) => {
          if (!experience.role) {
            errors[`experience_role_${index}`] = 'Role is required';
          }
          if (!experience.org) {
            errors[`experience_org_${index}`] = 'Organization is required';
          }
        });
      }
      break;

    case 8: // Education
      errors.education = validators.array(formData.education, { fieldName: 'education' });
      if (formData.education?.length > 0) {
        formData.education.forEach((education: any, index: number) => {
          if (!education.title) {
            errors[`education_title_${index}`] = 'Title is required';
          }
          if (!education.org) {
            errors[`education_org_${index}`] = 'Organization is required';
          }
        });
      }
      break;
  }

  return errors;
}