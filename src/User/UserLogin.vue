<script>

    /**
     * Forms
     */
    import Form from "../Form/Form";
    import userFormJSON from '../Form/user-login';

    export default {

        extends: Form,

        data() {
            return {
                endPoint: 'user/login',
                formData: userFormJSON
            }
        }

    };
</script>
