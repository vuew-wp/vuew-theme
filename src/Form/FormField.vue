<template>
    <fieldset v-if="field.type === 'text' || field.type === 'email' || field.type === 'password'">
        <input :type="field.type" :name="field.Id" v-on:keyup="validate( $event.target.value, field )">
    </fieldset>
    <fieldset v-else-if="field.type === 'text'">
        <input :type="field.type" v-on:keyup="validate( $event, field )">
    </fieldset>
</template>

<script>

    import formFields from './form-field-types';

    export default {

        props: [
            'field'
        ],
        methods:{
            validate(value, field){
                //console.log(value,field,formFields[field.type].validate_callback);
                //@todo replace with try catch
                if( formFields[field.type][ 'validate_callback' ]( value ) ) {
                    this.$emit('keyup', {value: value, id: field.id})
                }
            },
            validateText( value ){
                console.log(value)
                return true;
            },
            validatePassword( value ){
                console.log(value)
                return true;
            },
            validateEmail( value ){
                console.log(value)
                return true;
            }
        }
    }
</script>