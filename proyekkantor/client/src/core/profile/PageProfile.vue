<template>
    <div class="lp-profile">
        <div class="lp-profile-user">
            <div class="lp-profile-user-avatar">
                <SvgIcon icon="user-circle" />
            </div>
            <div class="lp-profile-user-info">
                <div class="lp-profile-user-name" v-if="userinfo.name">{{userinfo.name}}</div>
                <div class="lp-profile-user-name" v-else>{{userinfo.username}}</div>
                <div class="lp-profile-user-desc" v-if="userinfo.position">{{userinfo.position}}</div>
            </div>
        </div>
        <div class="lp-profile-sec">
            <h3 class="lp-profile-sec-title">Personal Info</h3>
            <div class="lp-profile-sec-content">
                <div class="lp-profile-sec-item">
                    <div class="lp-profile-sec-label">Name</div>
                    <div class="lp-profile-sec-val">{{userinfo.name}}</div>
                </div>
                <div class="lp-profile-sec-item">
                    <div class="lp-profile-sec-label">Email</div>
                    <div class="lp-profile-sec-val">{{userinfo.email}}</div>
                </div>
                <div class="lp-profile-sec-item">
                    <div class="lp-profile-sec-label">NIK</div>
                    <div class="lp-profile-sec-val">{{userinfo.nik}}</div>
                </div>
                <div class="lp-profile-sec-item">
                    <div class="lp-profile-sec-label">Position</div>
                    <div class="lp-profile-sec-val">{{userinfo.position}}</div>
                </div>
                <div class="lp-profile-sec-item">
                    <div class="lp-profile-sec-label">Unit</div>
                    <div class="lp-profile-sec-val">{{userinfo.unit}}</div>
                </div>
                <div class="lp-profile-sec-item" v-if="passChangable">
                    <div class="lp-profile-sec-label">Password</div>
                    <div class="lp-profile-sec-val"><Button label="Change Password" @click.prevent="togglePasswordForm" /></div>
                </div>
            </div>
            <form id="passForm">
                <div class="lp-profile-sec-content lp-profile-sec-content-form" v-if="showPassForm">
                    <div class="lp-profile-sec-item">
                        <div class="lp-profile-sec-label"></div>
                        <div class="lp-profile-sec-val"><TextField label="Current Password" type="password" v-model="currentPass" /></div>
                    </div>
                    <div class="lp-profile-sec-item">
                        <div class="lp-profile-sec-label"></div>
                        <div class="lp-profile-sec-val"><TextField label="New Password" type="password" v-model="newPass" /></div>
                    </div>
                    <div class="lp-profile-sec-item">
                        <div class="lp-profile-sec-label"></div>
                        <div class="lp-profile-sec-val"><TextField label="Confirm Password" type="password" v-model="confirmPass" /></div>
                    </div>
                    <div class="lp-profile-sec-item">
                        <div class="lp-profile-sec-label"></div>
                        <div class="lp-profile-sec-val"><Button label="Save Changes" color="primary" @click="savePassword" /> </div>
                    </div>
                    <div class="lp-profile-sec-item" v-if="isInvalid">
                        <div class="lp-profile-sec-label"></div>
                        <div class="lp-profile-sec-val"><Alert color="danger">{{errorMessage}}</Alert></div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import control from "./index";
export default control;
</script>

<style lang="less" src="./style.less" scoped></style>