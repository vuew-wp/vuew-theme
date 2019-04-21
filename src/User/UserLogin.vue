<script>

  /**
   * Forms
   */
  import Form from "../Form/Form";
  import userFormJSON from '../Form/user-login';

  export default {
    mixins: [Form],
    data() {
      return {
        endPoint: 'user/login',
        formData: userFormJSON
      }
    }

  };
</script>
