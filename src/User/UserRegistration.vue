<script>

    /** Forms */
    import Form from "../Form/Form";
    import userFormJSON from '../Form/user-registration';

    export default {

        extends: Form,

        data() {
            return {
                endPoint: 'user/register',
                formData: userFormJSON
            }
        }

    };
</script>
