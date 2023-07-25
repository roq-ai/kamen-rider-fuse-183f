import * as yup from 'yup';

export const kamenRiderImageValidationSchema = yup.object().shape({
  image_path: yup.string().required(),
  organization_id: yup.string().nullable(),
});
