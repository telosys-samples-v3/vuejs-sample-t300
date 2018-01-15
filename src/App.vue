<template>
    <div id="app">
        <!-- Navigation Bar -->
        <nav class="navbar navbar-inverse">
            <div class="container-fluid">
                <div class="navbar-header">
                    <div class="navbar-brand">
                        <router-link to="/">
                            <span class="glyphicon glyphicon-home"></span> Home
                        </router-link>
                    </div>
                </div>
                <ul class="nav navbar-nav">
					<li id="li1"><router-link to="/author">Author</router-link></li>
					<li id="li2"><router-link to="/badge">Badge</router-link></li>
					<li id="li3"><router-link to="/book">Book</router-link></li>
					<li id="li4"><router-link to="/bookOrder">BookOrder</router-link></li>
					<li id="li5"><router-link to="/bookOrderItem">BookOrderItem</router-link></li>
					<li id="li6"><router-link to="/country">Country</router-link></li>
					<li id="li7"><router-link to="/customer">Customer</router-link></li>
					<li id="li8"><router-link to="/employee">Employee</router-link></li>
					<li id="li9"><router-link to="/employeeGroup">EmployeeGroup</router-link></li>
					<li id="li10"><router-link to="/publisher">Publisher</router-link></li>
					<li id="li11"><router-link to="/review">Review</router-link></li>
					<li id="li12"><router-link to="/shop">Shop</router-link></li>
					<li id="li13"><router-link to="/synopsis">Synopsis</router-link></li>
					<li id="li14"><router-link to="/workgroup">Workgroup</router-link></li>
                </ul>
            </div>
        </nav>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'app'
    }
</script>