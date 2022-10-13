Vue.component('task-list', {
    props: {
        notepad_data: {
            type: Object,
            default() {
                return {}
            }
        },
        notepads: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    data() {
        return {
            taskTitle: '',
            newTaskTitle: '',
            newBlockTitle: '',
            task: [],
        }
    },
    methods: {
        notepadDelete() {
            this.$emit('notepad_delete')
        },
        add_task() {
            this.notepad_data.tasks.push({
                taskTitle: this.taskTitle,
                completed: false,
                isEdit: false,
            });
            this.taskTitle = '';
            localStorage.todo = JSON.stringify(this.notepads)
        },
        save() {
            localStorage.todo = JSON.stringify(this.notepads)
        },
        del_task(id) {
            this.notepad_data.tasks.splice(id, 1)
            localStorage.todo = JSON.stringify(this.notepads)
        },
        renameBlock(NewblockTitle) {
            this.newBlockTitle = NewblockTitle;
            if (this.notepad_data.notepadTitle === NewblockTitle) {
                this.notepad_data.isEditBlock = !this.notepad_data.isEditBlock
            }
            return this.notepad_data;
        },
        editBlock(NewblockTitle) {
            if (this.notepad_data.notepadTitle === NewblockTitle) {
                this.notepad_data.isEditBlock = !this.notepad_data.isEditBlock
                this.notepad_data.notepadTitle = this.newBlockTitle;
                localStorage.todo = JSON.stringify(this.notepads)
            }
            return this.notepad_data
        },
        rename(NewTitle) {
            this.newTaskTitle = NewTitle;
            this.notepad_data.tasks = this.notepad_data.tasks.map(task => {
                if (task.taskTitle === NewTitle) {
                    task.isEdit = !task.isEdit;
                }
                return task;
            })
        },
        edit(NewTitle) {
            this.notepad_data.tasks = this.notepad_data.tasks.map(task => {
                if (task.taskTitle === NewTitle) {
                    task.isEdit = !task.isEdit;
                    task.taskTitle = this.newTaskTitle;
                    localStorage.todo = JSON.stringify(this.notepads)
                }
                return task
            })
        }
    },
    template: `
            <div class="block_task">
                <div class="container_task">
                        <div class="create_task">
                            <input class="header_input" type="text" v-if="notepad_data.isEditBlock" @keyup.enter="editBlock(notepad_data.notepadTitle)" v-model="newBlockTitle">
                            <h3 v-else class="title_block" @click="renameBlock(notepad_data.notepadTitle)">{{notepad_data.notepadTitle}}</h3>
                            <button @click="notepadDelete()" class="btn_block">X</button>
                        </div>
                        <div class="task">
                            <div v-for="(el, x) in notepad_data.tasks" :key="x">
                                <div class="set_task">
                                    <input class="edit_input" type="text" v-if="el.isEdit" @keyup.enter="edit(el.taskTitle)" v-model="newTaskTitle">
                                    <h3 v-else :class="{'strike':el.completed}" @click="el.completed = !el.completed, save()" class="title_task">{{el.taskTitle}}</h3>
                                    <button @click="rename(el.taskTitle)" class="use-btn-task">Изменить</button>
                                    <button @click="del_task(x)" class="del-btn-task">Х</button>
                                </div>
                            </div>
                        <div class="add_task">
                            <div class="add_task__input">
                                <input type="text" @keyup.enter="add_task()" v-model="taskTitle" placeholder="Заголовок">
                            </div>
                        <button @click="add_task()" class="add_task_btn">Добавить</button>
                    </div>
                    </div>
            </div>
            </div>
    `
})

let app = new Vue({
    el: '#app',
    data: {
        notepadTitle: '',
        notepads: [],
        todos: []
    },
    mounted() {
        // localStorage.clear();
        if (localStorage.todo) {
            this.notepads = typeof JSON.parse(localStorage.todo) === "number" ? [JSON.parse(localStorage.todo)] : JSON.parse(localStorage.todo)
        }
    },
    methods: {
        addinTodos() {
            this.todos.push({
                notepads: this.notepads,
            })
        },
        createNotepad() {
            this.notepads.push({
                notepadTitle: this.notepadTitle,
                isEditBlock: false,
                tasks: [],
            });
            this.notepadTitle = '';
            localStorage.todo = JSON.stringify(this.notepads)
        },
        deleteNotepad(id) {
            app.notepads.splice(id, 1);
            localStorage.todo = JSON.stringify(this.notepads)
        },
    },
})
