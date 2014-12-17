(function(window) {

   if (typeof Sogevia == "undefined") {
        window.Sogevia = {};
    }

    if (typeof Sogevia.Office == "undefined") {
        Sogevia.Office = {};
    }

    if (typeof Sogevia.Office.Form == "undefined") {
        Sogevia.Office.Form = {};
    }


    Sogevia.Office.Form.Boolean = function(configs)
    {
        configs = configs ? configs : {};

        this.config = {
            'selector'  : ("selector" in configs) ? configs['selector'] : '.boolean-form-type',
            'baseId'    : ('baseId' in configs) ? configs['baseId'] : 'BooleanFormType',
            'itemClass' : ('itemClass' in configs) ? configs['itemClass'] : 'boolean-form-type-container'
        };

        var items = document.querySelectorAll(this.config.selector);

        if (items.length > 0) {
            for (var i = 0; i < items.length; i++) {
                this.render(items.item(i), i);
            }
        }

        var buttons = document.querySelectorAll('.'+ this.config.itemClass +' .boolean-btn'),
            self    = this;

        if (buttons.length > 0) {
            for (var i = 0; i < buttons.length; i++) {
                buttons.item(i).addEventListener('click', function(event) {
                    callable([self.changeEvent, self], [event]);
                });
            }
        }
    };

    Sogevia.Office.Form.Boolean.prototype.render = function(item, key, value)
    {
        if (!item.id) {
            item.id = this.generateId(key);
        }

        var render = document.createElement('div'),
            btn    = document.createElement('button');

        render.id        = item.id + '-btn';
        render.className = item.value == 1 ? this.config.itemClass +' yes' : this.config.itemClass;

        btn.type      = 'button';
        btn.name      = 'BooleanFormTypeBtn';
        btn.className = 'boolean-btn';

        render.appendChild(btn);
        item.parentNode.insertBefore(render, item.nextSibling);
        item.classList.add('hide');
    };

    Sogevia.Office.Form.Boolean.prototype.changeEvent = function(event)
    {
        var container = event.target.parentNode;

        if (container.classList.contains('yes')) {
            container.classList.remove('yes');
            this.setSelectValue('#'+ this.defineIdByContainer(container.id), 0);
        } else {
            container.classList.add('yes');
            this.setSelectValue('#'+ this.defineIdByContainer(container.id), 1);
        }
    };

    Sogevia.Office.Form.Boolean.prototype.setSelectValue = function(selector, value)
    {
        var select = document.querySelector(selector);

        if (select) {
            for (var i in select.options) {
                if (select.options[i].value == value) {
                    select.selectedIndex = i;

                    return;
                }
            }
        }
    };

    Sogevia.Office.Form.Boolean.prototype.generateId = function(key)
    {
        return '#'+ this.config.baseId +'-'+ key;
    };
    
    Sogevia.Office.Form.Boolean.prototype.defineIdByContainer = function(idContainer)
    {
        return idContainer.substring(0, idContainer.lastIndexOf('-'));
    };

})(window);