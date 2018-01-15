<template>
    <div class="container">
    <div class="container">
        <div class="panel-group">
            <div class="panel panel-info">
                <div class="panel-heading">
                    <h3>
                        <span class="glyphicon glyphicon-leaf"></span>
                        BookOrderItem List
						<router-link to="/bookOrderItem/form" title="Create a new bookOrderItem">
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
                   				 <td>bookOrderId</td>
                   				 <td>bookId</td>
                   				 <td>quantity</td>
                   				 <td>price</td>
               				</tr>
                		</thead>
                		<tbody>
                			<tr v-for="bookOrderItem in bookOrderItems">
                				<td><router-link :to="`/bookOrderItem/form/${+bookOrderItem.bookOrderId/bookOrderItem.bookId}`">{{bookOrderItem.bookOrderId}}</router-link></td>
                				<td><router-link :to="`/bookOrderItem/form/${+bookOrderItem.bookOrderId/bookOrderItem.bookId}`">{{bookOrderItem.bookId}}</router-link></td>
                				<td><router-link :to="`/bookOrderItem/form/${+bookOrderItem.bookOrderId/bookOrderItem.bookId}`">{{bookOrderItem.quantity}}</router-link></td>
                				<td><router-link :to="`/bookOrderItem/form/${+bookOrderItem.bookOrderId/bookOrderItem.bookId}`">{{bookOrderItem.price}}</router-link></td>
                				<td>
                					<a @click="showModal = true; editBookOrderItem(bookOrderItem)"><span class="glyphicon glyphicon-trash"></span></a>
                					<modal v-if="showModal" @close="showModal = false">
                					<div slot="footer">
                                        <button type="button" class="btn btn-success pull-right" title="Delete this bookOrderItem" v-on:click.prevent="showModal = false; deleteBookOrderItem(modalData)">Yes</button>
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
                                    Are you sure you want to delete this bookOrderItem ?
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
        name: 'BookOrderItemIndex',
        data() {
			let http = this.$http;
            return new Vue({
            el: '#bookOrderItemPanel',
            data: {
                bookOrderItems: {},
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
                editBookOrderItem (bookOrderItem) {
                    this.modalData = bookOrderItem;
                },
                deleteBookOrderItem: function (modalData) {
					{
                        http.delete(config.urlApi+'/bookOrderItem/'+modalData.bookOrderId+'/'+modalData.bookId).then(response => {
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
                        http.get(config.urlApi+'/bookOrderItem').then(response => {
                            if(response.body[0]) {
                                this.bookOrderItems = response.body;
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