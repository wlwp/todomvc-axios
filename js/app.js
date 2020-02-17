;(function(window) {
	'use strict'

	const vm = new Vue({
		el: '#app',
		data: {
			list: [],
			todoname: '',
			editid: -1
		},
		watch: {
			// list: {
			// 	deep: true,
			// 	handler(newval) {
			// 		console.log(newval)
			// 		localStorage.setItem('list', JSON.stringify(newval))
			// 	}
			// }
		},
		created() {
			// this.list = JSON.parse(localStorage.getItem('list') || '[]')
			this.render()
		},
		methods: {
			// 渲染页面
			render() {
				axios.get('http://localhost:3000/list').then(res => {
					console.log(res)
					this.list = res.data
				})
			},
			// 1.添加任务
			addtodo() {
				if (this.todoname.trim() === '') {
					this.todoname = ''
					return
				}
				// let id =
				// 	this.list.length === 0 ? 1 : this.list[this.list.length - 1].id + 1
				// let done = false
				// let name = this.todoname
				// let obj = { id, name, done }
				// this.list.push(obj)
				// this.todoname = ''

				axios
					.post('http://localhost:3000/list', {
						name: this.todoname,
						done: false
					})
					.then(res => {
						console.log(res)
						this.render()
						this.todoname = ''
					})
			},

			// 2.删除任务
			deletetodo(id) {
				console.log(id)
				// this.list = this.list.filter(item => item.id !== id)
				// console.log(this.list)

				axios.delete('http://localhost:3000/list/' + id).then(res => {
					console.log(res)
					this.render()
				})
			},
			// 双击显示编辑任务
			showEdit(id) {
				this.editid = id
			},
			// 编辑任务
			edittodo(e) {
				let name = e.target.value

				axios
					.patch('http://localhost:3000/list/' + this.editid, {
						name
					})
					.then(res => {
						console.log(res)
						this.render()
					})
				this.editid = -1
			},
			// 清除已经完成任务的
			clearCompleted() {
				this.list = this.list.filter(item => !item.done)
			},
			// 修改状态
			changeStatus(id, done) {
				console.log(done)

				axios
					.patch('http://localhost:3000/list/' + id, {
						done: !done
					})
					.then(res => {
						this.render()
					})
			}
		},
		computed: {
			// 判断底部的显示隐藏
			isFooterShow() {
				return this.list.length > 0
			},
			// 未完成任务的数量
			leftCount() {
				return this.list.filter(item => !item.done).length
			},
			// 显示隐藏完成任务的按钮
			isCompletedShow() {
				return this.list.some(item => item.done)
			}
		}
	})
})(window)
