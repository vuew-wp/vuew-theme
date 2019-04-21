<template>
    <div :class="inputStateChangeClass" class="uk-margin-bottom">
        <label v-if="field.label" :for="'vw-form-field-' + field.id" v-html="field.label"></label>
        <input class="uk-input" :type="field.type" :placeholder="field.placeholder" :name="field.id"
               :id="'vw-form-field-' + field.id" v-on:input="validate( $event.target.value, field )" v-on:focus="touched = true">
        <div v-if="field.confirmInput">
            <label :for="'vw-form-field-' + field.id + '-confirm'">Confirm Password</label>
            <input :id="'vw-form-field-' + field.id + '-confirm'" type="password" placeholder="Confirm password" class="uk-input" v-on:input="matchField( $event.target.value, field )">
        </div>
        <div v-if="field.strengthIndicator">
            <p v-html="( strength / 8 ) * 100 + '%'"></p>
            <div class="uk-width-1-1 uk-position-relative vw-password-strength-indicator">
                <div :style="{'width': 100 - ( ( strength / 8 ) * 100 ) + '%'}" class="uk-position-top-right"></div>
                <div class="uk-float-left" style="background-color: red;"></div>
                <div class="uk-float-left" style="background-color: orange;"></div>
                <div class="uk-float-left" style="background-color: yellow;"></div>
                <div class="uk-float-left" style="background-color: green;"></div>
            </div>
        </div>
        <p v-if="field.desc" v-html="field.desc" class="uk-text-small"></p>
    </div>
</template>

<script>

    import FormField from './FormField';

    export default {

        extends: FormField,

        data() {
            return {
                passwordRegex : {
                    hasSpace            : /\s/,
                    hasDigit            : /(?=.*[0-9])/,
                    hasLowerCaseChar    : /(?=.*[a-z])/,
                    hasUpperCaseChar    : /(?=.*[A-Z])/,
                    hasSpecialChar      : /(?=.*[|!@#$&*?^~])/,
                    hasRepetition       : /([a-zA-Z0-9|!@#$&*?^~]).*?\1/
                },
                strength: 0,
                password: '',
                passwordMatch: ''
            }
        },
        methods:{
            matchField( value ){
                this.passwordMatch = value;
                this.isValid();
                return this.password === this.passwordMatch;
            },
            isValid(){
                this.valid = this.password.length >= 8 && this.password === this.passwordMatch && this.strength >= 7;
            },
            validPassword( value ){

                const valLeng = value.length;

                /**
                 * Login
                 */
                if( "login" === this.json.formType ){
                    this.valid = valLeng >= 8;
                    return this.valid;
                }

                /**
                 * Registration
                 */
                let regexScore = 0, lengthScore = 0, finalScore = 0;

                for( let regex in this.passwordRegex ){
                    if( ! this.passwordRegex.hasOwnProperty( regex ) || 'hasRepetition' === regex || 'hasSpace' === regex ) {
                        continue;
                    }
                    if( this.passwordRegex[ regex ].test( value ) ){
                        ++regexScore;
                    }
                }

                if( valLeng > 4 ){
                    lengthScore = valLeng <= 8 ? valLeng / 2 : 4;
                }

                finalScore = regexScore + lengthScore;

                if( valLeng >= 1 && valLeng < 9 && this.passwordRegex.hasRepetition.test( value ) ){
                    --finalScore;
                }

                this.password = value;
                this.strength = finalScore;

                this.isValid();

                return this.strength >= 7;
            }
        }
    }
</script>
<style lang="less">
    .vw-password-strength-indicator{
        height: 4px;

        > *{
            height: 4px;
        }

        .uk-float-left{
            width: 25%;
        }

        > div{
            background-color: #f8f8f8;
        }
    }
</style>
