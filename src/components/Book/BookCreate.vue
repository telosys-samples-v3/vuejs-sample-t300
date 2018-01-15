<template>
    <div class="container">
        <div class="container">
            <form class="form-horizontal" method="post" id="bookForm" v-on:submit.prevent="saveBook">
                <div class="panel-group">
                    <div class="panel panel-info">
                        <div class="panel-heading">
                            <h3>
                                <span class="glyphicon glyphicon-leaf"></span>
                                Create Book
                                <router-link to="/book" title="Back to the list">
                                    <button type="button" class="btn btn-link pull-right">
                                        List
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
                            <div class="form-group">
                                <label class="col-sm-2">id *</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control"
                                           v-model="book.id" placeholder="Enter Book id" required >
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2">publisherId *</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control"
                                           v-model="book.publisherId" placeholder="Enter Book publisherId" required >
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2">authorId *</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control"
                                           v-model="book.authorId" placeholder="Enter Book authorId" required >
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2">isbn *</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control"
                                           v-model="book.isbn" placeholder="Enter Book isbn" required >
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2">title</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control"
                                           v-model="book.title" placeholder="Enter Book title" >
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2">price</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control"
                                           v-model="book.price" placeholder="Enter Book price" >
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2">quantity</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control"
                                           v-model="book.quantity" placeholder="Enter Book quantity" >
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2">discount</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control"
                                           v-model="book.discount" placeholder="Enter Book discount" >
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2">availability</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control"
                                           v-model="book.availability" placeholder="Enter Book availability" >
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2">bestSeller</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control"
                                           v-model="book.bestSeller" placeholder="Enter Book bestSeller" >
                                </div>
                            </div>
                        </div>
                        <div class="panel-footer text-center">
                            <a href="../../book/" title="Save the new book">
                                <button type="submit" formaction="../../book/" class="btn btn-success"><span class="glyphicon glyphicon-floppy-disk"></span> Save</button>
                            </a>
                            <div class="clearfix"></div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import common from '../../common.js'
    import config from '../../../config/config.js'

    export default {
        name: 'BookCreate',
        data() {
            let router = this.$router;
			let http = this.$http;
            return new Vue({
                el: '#bookCreate',
                data: {
                    book: {},
                    status: {
                        status: null,
                        message: null,
                        display: "none",
                        bootstrapPanelColor: null,
                    },
                },
                methods: {
                    saveBook: function () {
                        let book = {
                            'id': this.book.id,
                    		'publisherId': this.book.publisherId,
                   			'authorId': this.book.authorId,
                   			'isbn': this.book.isbn,
                   			'title': this.book.title,
                   			'price': this.book.price,
                   			'quantity': this.book.quantity,
                   			'discount': this.book.discount,
                   			'availability': this.book.availability,
                   			'bestSeller': this.book.bestSeller,
                   			
                        };
                        http.post(config.urlApi + '/book', book).then(response => {
                            common.apiConnect(this, response);
                            if (response.status === 201) {
                                setTimeout(function () {
                                    router.push('/book/form/'+book.id);
                                }, 3000);
                            }
                        }, response => {
                            common.apiUnreachable(this, response);
                        });
                        this.status.display = "block";
                    }
                }
            });
        }
    }
</script>