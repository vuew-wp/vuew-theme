<script>

    import {HTTP_Vuew} from '../common/http_proxy';

    /**
     * Forms
     */
    import Form from "../Form/Form";
    import userFormJSON from '../Form/user-registration.json';

    export default {

        extends: Form,

        methods: {
            submit( data ) {
                HTTP_Vuew.get( 'user/register', {
                    params: data
                }).then(res => {
                    console.log(res.data);
                });
            }
        },

        data() {
            return {
                formData: userFormJSON
            }
        }

    };
</script>
