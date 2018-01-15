<template>
    <div class="container">
    <div class="container">
        <div class="panel-group">
            <div class="panel panel-info">
                <div class="panel-heading">
                    <h3>
                        <span class="glyphicon glyphicon-leaf"></span>
                        BookOrder List
						<router-link to="/bookOrder/form" title="Create a new bookOrder">
                            <button type="button" class="btn btn-success pull-right"><span
                                        class="glyphicon glyphicon-plus"></span> Create
                            </button>
						</router-link>
                    </h3>
                </div>
                <div class="panel-body">
                    <div v-bind:style="'display:'+status.display" class="panel-group">
                        <div v-bind:class="'panel panel-'+status.bootstrapPanelColor">
                            <div class="panel-heading">{{ status.status }}
                                <div class="panel panel-body">{{ status.message }}
                                </div>
                            </div>
                        </div>
                    </div>
					<table class="table table-striped table-bordered text-center">
              			<thead>
                			<tr>
                   				 <td>id</td>
                   				 <td>shopCode</td>
                   				 <td>customerCode</td>
                   				 <td>employeeCode</td>
                   				 <td>date</td>
                   				 <td>state</td>
               				</tr>
                		</thead>
                		<tbody>
                			<tr v-for="bookOrder in bookOrders">
                				<td><router-link :to="`/bookOrder/form/${+bookOrder.id}`">{{bookOrder.id}}</router-link></td>
                				<td><router-link :to="`/bookOrder/form/${+bookOrder.id}`">{{bookOrder.shopCode}}</router-link></td>
                				<td><router-link :to="`/bookOrder/form/${+bookOrder.id}`">{{bookOrder.customerCode}}</router-link></td>
                				<td><router-link :to="`/bookOrder/form/${+bookOrder.id}`">{{bookOrder.employeeCode}}</router-link></td>
                				<td><router-link :to="`/bookOrder/form/${+bookOrder.id}`">{{bookOrder.date}}</router-link></td>
                				<td><router-link :to="`/bookOrder/form/${+bookOrder.id}`">{{bookOrder.state}}</router-link></td>
                				<td>
                					<a @click="showModal = true; editBookOrder(bookOrder)"><span class="glyphicon glyphicon-trash"></span></a>
                					<modal v-if="showModal" @close="showModal = false">
                					<div slot="footer">
                                        <button type="button" class="btn btn-success pull-right" title="Delete this bookOrder" v-on:click.prevent="showModal = false; deleteBookOrder(modalData)">Yes</button>
                                    </div>
                					</modal>
                				</td>
                			</tr>
                		</tbody>
					</table>
                </div>
            </div>

            <script type="text/x-template" id="modal-template">
                <transition name="modal">
                    <div class="modal-mask">
                        <div class="modal-wrapper">
                            <div class="container modal-container">
                                <div class="panel-group">
                                    <div class="panel panel-info">
                                        <div class="panel-heading">
                                            <h3>Warning</h3>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-body">
                                    Are you sure you want to delete this bookOrder ?
                                </div>
                                <div class="modal-footer">
                                    <div class="btn-toolbar">
                                        <button type="button" class="btn btn-danger pull-right"
                                                title="Cancel and close this panel" @click="$emit('close')">No
                                        </button>

                                        <slot name="footer">
                                        </slot>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>
            </script>

        </div>
    </div>
</div>
</template>

<script>
    import Vue from 'vue'
    import common from '../../common.js'
    import config from '../../../config/config.js'
    import modal from '../modal'

    export default {
        name: 'BookOrderIndex',
        data() {
			let http = this.$http;
            return new Vue({
            el: '#bookOrderPanel',
            data: {
                bookOrders: {},
                modalData: {},
                showModal: false,
                status: {
                    status: null,
                    message: null,
                    display: "none",
                    bootstrapPanelColor: null,
                }
            },
            created () {
                this.fetchData();
            },
            methods: {
                editBookOrder (bookOrder) {
                    this.modalData = bookOrder;
                },
                deleteBookOrder: function (modalData) {
					{
                        http.delete(config.urlApi+'/bookOrder/'+modalData.id).then(response => {
                            common.apiConnect(this, response);
                            this.fetchData();
                        }, response => {
                            common.apiUnreachable(this);

                        });
                        this.status.display = "block";
                    }
                },
                fetchData: function () {
					{
                        http.get(config.urlApi+'/bookOrder').then(response => {
                            if(response.body[0]) {
                                this.bookOrders = response.body;
                            }
                        }, response => {
                            common.apiUnreachable(this, response);
                            this.status.display = "block";
                        });
                    }
                }
            }
        });
        }
    }
</script>