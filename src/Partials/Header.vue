<template>
    <header class="vw-primary-header uk-position-fixed uk-width-1-1 uk-box-shadow-small uk-box-shadow-hover-medium">
        <custom-logo></custom-logo>
        <off-canvas-toggle>MENU</off-canvas-toggle>
        <user-registration></user-registration>
    </header>
</template>
<script>

    import CustomLogo from './CustomLogo';
    import OffCanvasToggle from './OffCanvas/OffCanvasToggle';

    import _ from 'lodash'
    import UserRegistration from "../User/UserRegistration";

    export default {

        components:{
            UserRegistration,
            OffCanvasToggle,
            CustomLogo
        },
        methods:{
            handleScroll: _.throttle( function() {

                const vm = this;
                let currentScrollPos = window.pageYOffset;

                if( currentScrollPos < 100 || currentScrollPos === vm.prevScrollPos ) {
                    vm.$el.style.top = "0";
                    this.visible = true;
                    return;
                }

                const scrollingUp = vm.prevScrollPos > currentScrollPos;
                vm.prevScrollPos = currentScrollPos;

                if ( scrollingUp ) {
                    if( ! this.visible )
                        vm.$el.style.top = "0";
                    this.visible = true;
                    return;
                }

                if( this.visible )
                    vm.$el.style.top = "-100px";
                this.visible = false;

            },  100 )
        },
        computed:{
            canListen(){
                return this.$store.getters['getOffCanvasState'];
            }
        },
        data() {
            return {
                site_name: "Vuew Theme",
                prevScrollPos: 0,
                visible: true
            }
        },
        mounted () {
            window.addEventListener('scroll', this.handleScroll );
        },
        destroyed () {
            window.removeEventListener('scroll', this.handleScroll);
        }
    };
</script>
<style lang="less">
    .vw-primary-header{
        z-index: 2;
        top: 0;
        transition: top 0.3s;
    }
    .admin-bar{
        .vw-primary-header{
            top: 46px;
        }
    }
</style>