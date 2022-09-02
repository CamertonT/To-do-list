"use strict";

document.addEventListener("DOMContentLoaded", () => {
    let data = [];
    const container = document.querySelector('.list');

    // insert list-item in list
    const insertBtn = document.querySelector('#insert'),
        insertText = document.querySelector('#inputText');

    insertBtn.addEventListener('click', addTask);
    showList();


    function addTask () {
        if (insertText.value == undefined || insertText.value == null || insertText.value == '') {
            alert('Введите задачу');
        } else {
            data.push({
                descr: insertText.value,
                important: false,
                done: false,
                id: Date.now()
            });
    
            insertText.value = '';
            showList(data);
        }
    }

    // show the list
    function showList(array = data) {
        clearListArea();

        let cssClass = '';

        array.forEach((item) => {
            if (item.done) {
                cssClass = 'list-item__descr_done';
            } else {
                cssClass = '';
            }
            let li = document.createElement('li');
            li.classList.add('list-item');
            li.innerHTML = `
            <div id="${item.id}" class="list-item__descr ${cssClass}">${item.descr}</div>
                <div class="list-item__btn-wrapper">
                    <button class="button button_complete" data-action="complete">complete</button>
                    <button class="button button_delete" data-action="delete">delete</button>
                </div>
            
            `;
            container.append(li);
        });
    }

    function clearListArea() {
        container.innerHTML = '';
    }

    // delete/complete list-item
    container.addEventListener('click', delTask);
    container.addEventListener('click', completeTask);

    function delTask(e) {
        if (e.target.dataset.action === 'delete') {
            let parentNode = e.target.closest('.list-item');
            let listItemId = parentNode.querySelector('.list-item__descr').id;

            data.forEach((item, key) => {
                if (item.id == listItemId) {
                    delete data[key];        
                }
            });

            showList();
        }
    }

    function completeTask(e) {
        if (e.target.dataset.action === 'complete') {
            let parentNode = e.target.closest('.list-item');
            let listItemText = parentNode.querySelector('.list-item__descr').textContent;

            data.forEach((item, key) => {
                if (item.descr === listItemText) {
                    data[key].done = true;         
                }
            });

            showList();
        }
    }


});