<template>
    <div class="index">
        <div class="container">
            <div class="container">
                <div class="panel-group">
                    <div class="panel panel-info">
                        <div class="panel-heading"><h3><span class="glyphicon glyphicon-leaf"></span> Home</h3></div>
                        <div class="panel-body">
                            <ul class="list-group">
                        <li class = "list-group-item list-group-item-action">
                            <router-link to="/author">Author</router-link>
                        </li>
                        <li class = "list-group-item list-group-item-action">
                            <router-link to="/badge">Badge</router-link>
                        </li>
                        <li class = "list-group-item list-group-item-action">
                            <router-link to="/book">Book</router-link>
                        </li>
                        <li class = "list-group-item list-group-item-action">
                            <router-link to="/bookOrder">BookOrder</router-link>
                        </li>
                        <li class = "list-group-item list-group-item-action">
                            <router-link to="/bookOrderItem">BookOrderItem</router-link>
                        </li>
                        <li class = "list-group-item list-group-item-action">
                            <router-link to="/country">Country</router-link>
                        </li>
                        <li class = "list-group-item list-group-item-action">
                            <router-link to="/customer">Customer</router-link>
                        </li>
                        <li class = "list-group-item list-group-item-action">
                            <router-link to="/employee">Employee</router-link>
                        </li>
                        <li class = "list-group-item list-group-item-action">
                            <router-link to="/employeeGroup">EmployeeGroup</router-link>
                        </li>
                        <li class = "list-group-item list-group-item-action">
                            <router-link to="/publisher">Publisher</router-link>
                        </li>
                        <li class = "list-group-item list-group-item-action">
                            <router-link to="/review">Review</router-link>
                        </li>
                        <li class = "list-group-item list-group-item-action">
                            <router-link to="/shop">Shop</router-link>
                        </li>
                        <li class = "list-group-item list-group-item-action">
                            <router-link to="/synopsis">Synopsis</router-link>
                        </li>
                        <li class = "list-group-item list-group-item-action">
                            <router-link to="/workgroup">Workgroup</router-link>
                        </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    export default {
        name: 'index',
    }
</script>