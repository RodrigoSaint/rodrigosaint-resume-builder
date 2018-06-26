import { validate, isRequired } from "kaizen-validation";

export default function validateUser(user) {
  return validate(
    {
      name: [isRequired],
      nameOnUrl: [isRequired],
      profilePicture: [isRequired]
    },
    user
  );
}
