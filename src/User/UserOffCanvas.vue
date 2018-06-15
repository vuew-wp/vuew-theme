<template>
    <off-canvas target="userOffCanvas">
        <user-registration/>
        <user-login/>
    </off-canvas>
</template>
<script>

    import UserRegistration from './UserRegistration';
    import OffCanvas from "../Partials/OffCanvas/OffCanvas";
    import UserLogin from "./UserLogin";

    export default {
        components: {
            UserLogin,
            OffCanvas,
            UserRegistration
        }
    };

</script>