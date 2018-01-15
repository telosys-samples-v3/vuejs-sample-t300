<template>
    <div class="container">
    <div class="container">
        <div class="panel-group">
            <div class="panel panel-info">
                <div class="panel-heading">
                    <h3>
                        <span class="glyphicon glyphicon-leaf"></span>
                        Book List
						<router-link to="/book/form" title="Create a new book">
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
                   				 <td>publisherId</td>
                   				 <td>authorId</td>
                   				 <td>isbn</td>
                   				 <td>title</td>
                   				 <td>price</td>
                   				 <td>quantity</td>
                   				 <td>discount</td>
                   				 <td>availability</td>
                   				 <td>bestSeller</td>
               				</tr>
                		</thead>
                		<tbody>
                			<tr v-for="book in books">
                				<td><router-link :to="`/book/form/${+book.id}`">{{book.id}}</router-link></td>
                				<td><router-link :to="`/book/form/${+book.id}`">{{book.publisherId}}</router-link></td>
                				<td><router-link :to="`/book/form/${+book.id}`">{{book.authorId}}</router-link></td>
                				<td><router-link :to="`/book/form/${+book.id}`">{{book.isbn}}</router-link></td>
                				<td><router-link :to="`/book/form/${+book.id}`">{{book.title}}</router-link></td>
                				<td><router-link :to="`/book/form/${+book.id}`">{{book.price}}</router-link></td>
                				<td><router-link :to="`/book/form/${+book.id}`">{{book.quantity}}</router-link></td>
                				<td><router-link :to="`/book/form/${+book.id}`">{{book.discount}}</router-link></td>
                				<td><router-link :to="`/book/form/${+book.id}`">{{book.availability}}</router-link></td>
                				<td><router-link :to="`/book/form/${+book.id}`">{{book.bestSeller}}</router-link></td>
                				<td>
                					<a @click="showModal = true; editBook(book)"><span class="glyphicon glyphicon-trash"></span></a>
                					<modal v-if="showModal" @close="showModal = false">
                					<div slot="footer">
                                        <button type="button" class="btn btn-success pull-right" title="Delete this book" v-on:click.prevent="showModal = false; deleteBook(modalData)">Yes</button>
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
                                    Are you sure you want to delete this book ?
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
        name: 'BookIndex',
        data() {
			let http = this.$http;
            return new Vue({
            el: '#bookPanel',
            data: {
                books: {},
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
                editBook (book) {
                    this.modalData = book;
                },
                deleteBook: function (modalData) {
					{
                        http.delete(config.urlApi+'/book/'+modalData.id).then(response => {
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
                        http.get(config.urlApi+'/book').then(response => {
                            if(response.body[0]) {
                                this.books = response.body;
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