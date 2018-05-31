<template>
    <header class="vw-primary-header uk-position-fixed uk-width-1-1 uk-box-shadow-small uk-box-shadow-hover-medium">
        <custom-logo></custom-logo>
        <off-canvas-toggle target="offCanvasMenu">MENU</off-canvas-toggle>
        <!--<vw-user></vw-user>-->
    </header>
</template>
<script>

    import CustomLogo from './CustomLogo';
    import OffCanvasToggle from './OffCanvas/OffCanvasToggle';

    import _ from 'lodash'
    import UserRegistration from "../User/UserRegistration";

    export default {

        components:{
            'vw-user' : UserRegistration,
            OffCanvasToggle,
            CustomLogo
        },
        methods:{
            visibile( visible ){
                this.$el.style.top = visible ? "0" : "-100px";
                this.visible = visible;
            },
            handleScroll: _.throttle( function() {

                const vm = this;
                let currentScrollPos = window.pageYOffset;

                if( currentScrollPos < 100 || currentScrollPos === vm.prevScrollPos ) {
                    this.visibile( true );
                    return;
                }

                const scrollingUp = vm.prevScrollPos > currentScrollPos;
                vm.prevScrollPos = currentScrollPos;

                if ( scrollingUp ) {
                    if( ! this.visible )
                        this.visibile( true );
                    return;
                }

                if( this.visible )
                    this.visibile( false );

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