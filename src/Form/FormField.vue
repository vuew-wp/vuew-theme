<template>
    <fieldset v-if="field.type === 'text' || field.type === 'email' || field.type === 'password'">
        <input :type="field.type" :name="field.Id" v-on:change="validate( $event.target.value, field )">
    </fieldset>
    <!--<fieldset v-else-if="field.type === 'text'">
        <input :type="field.type" v-on:change="validate( $event, field )">
    </fieldset>-->
</template>

<script>

    import formFields from './form-field-types';

    import _ from 'lodash';

    export default {

        props: [
            'field'
        ],
        data() {
            return {
                json: {}
            }
        },
        mounted(){
            this.json = _.merge( formFields[ this.field.type ], this.field );
        },
        methods:{
            validate(value, field){
                const vm = this;
                //@todo replace with try catch
                const validateMethod = this.json[ 'validate_callback' ];
                if( vm[ validateMethod ]( value ) ) {
                    this.$emit( 'change', { value: value, id: field.id } );
                }
            },
            validateText( value ){
                return true;
            },
            validatePassword( value ){
                return true;
            },
            validateEmail( value ){
                return true;
            }
        }
    }
</script>