<template>
	<main >
		<div class="container content">
			<div v-show="isAdmin" class="add_news">
				<article class="add_news__top" v-show="newsId<=0">
					<a href="#" @click.prevent="addNewsHandler">
						<i class="fas fa-plus  fa-3x add_news_icon"></i>			
					</a>
					<span @click.prevent="addNewsHandler">
						Добавить новость
					</span>
				</article>
			</div>
			<div class="add_news" v-show="newsId!==-1">
				<h4>
					Image preview
				</h4>
				<img alt="image preview" src=""/>
				<form name="add_news" method="post" action="#" class="r-flex">
					<input type="text" 
						placeholder="Введите название новости" 
						name="news title" class="inputshadow" 
						v-model="editingNews.title">
					<textarea placeholder="Введите описание новости" class="inputshadow" v-model="editingNews.fullText">
		
					</textarea>
					<div class="add_news_controls r-flex">
						<div class="add_news_controls_left">
							<input type="checkbox" v-model="editingNews.pinned" name="fixed" class="inputshadow"/>
							<label for="fixed">Закрепить новость</label>
							<input type="checkbox" v-model="editingNews.visible" name="public" class="inputshadow">
							<label for="public">Публичная новость</label>
						</div>
						<div class="add_news_controls_right">
							<!--<input type="button" name="put image" value="Вставить/Изменить картинку" class=""/>-->
							<input type="button" name="put image" value="Отменить" class="" @click.prevent="cancleHandler"/>
							<input type="submit" name="submit news" value="Опубликовать" @click.prevent="publishHandler(editingNews)"/>
						</div>
					</div>
				</form>
			</div>
			<NewsItem v-for="snews in news" 
				:key="snews.id" 
				:news="snews" 
				:editingId="newsId"
				v-on:editing="editingHandler($event)"/>
			<p class="news_archive">
				<!--<a href="#" >-->
				<!--	архив новостей-->
				<!--</a>-->
			
			</p>
		</div><!--container-->
	</main> <!--main-->
</template>

<script>
// @ is an alias to /src
import NewsItem from '../components/NewsItem.vue'
import {mapGetters, mapActions, mapState} from 'vuex';
export default {
  name: 'home',
  data: ()=> ({
	editingNews: {
		title: '',
		fulltext: '',
		pinned: false,
		hidden: false,
		visible: true
	},
	newsId: -1
  }),
  components: {
    NewsItem
  },
  computed: {
	...mapGetters(['isAdmin', 'getNews']),
	...mapState(['news'])
  },
  methods:{
	...mapActions(['fetchNews', 'createNews', 'updateNews']),
	cancleHandler(){
		this.newsId = -1;
		this.editingNews = {
			title: '',
			fulltext: '',
			pinned: false,
			hidden: false,
			visible: true
		};
	},
	editingHandler($event){
		this.newsId = $event;
		this.editingNews = this.getNews($event);
		//console.log($event)		
	},
	publishHandler(editingNews){
		if(editingNews.id){
			this.updateNews(editingNews)
				.then(
					updatedNews => {
						this.newsId = -1;
						this.editingNews = {
							title: '',
							fulltext: '',
							pinned: false,
							hidden: false,
							visible: true
						};
					}
				)
		}else{
			this.createNews(editingNews)
				.then(
					addedNews => {
						this.newsId = -1;
						this.editingNews = {
							title: '',
							fulltext: '',
							pinned: false,
							hidden: false,
							visible: true
						};
					}
				)
		}
	},
	addNewsHandler(){
		this.newsId=0;
		this.editingNews = {};
    }
  },
  
  mounted(){
	this.fetchNews()
		.then(
			news => {
				//console.log(news);
			}
		)
  }
}
</script>
