export default {
    components: {
        // layout
        col: {
            keywords: [ 'span', 'xs', 'sm', 'md', 'lg', 'xl', 'offset', 'push', 'pull' ]
        },
        row: {
            keywords: [ 'span', 'type', 'tag' ]
        },
        // container
        container: {
            keywords: [ 'direction' ]
        },
        header: {
            keywords: [ 'height' ]
        },
        aside: {
            keywords: [ 'width' ]
        },
        footer: {
            keywords: [ 'height' ]
        },
        // button
        button: {
            keywords: [ 'size', 'type', 'plain', 'round', 'circle', 'loading', 'disabled', 'icon', 'autofocus', 'native-type' ]
        },
        // link
        link: {
            keywords: [ 'type', 'underline', 'disabled', 'href', 'icon' ]
        },
        // form
        radio: {
            keywords: [ 'label', 'v-model', 'value', 'disabled', 'size', 'name' ],
            events: [ 'change' ]
        },
        'radio-button': {
            keywords: [ 'label', 'disabled', 'name' ]
        },
        'radio-group': {
            keywords: [ 'v-model', 'value', 'size', 'disabled', 'textColor', 'fillColor' ],
            events: [ 'change' ]
        },
        checkbox: {
            keywords: [ 'value', 'v-model', 'label', 'true-label', 'false-label', 'disabled', 'border', 'size', 'name', 'checked', 'indeterminate' ],
            events: [ 'change' ]
        },
        'checkbox-group': {
            keywords: [ 'value', 'v-model', 'size', 'disabled', 'min', 'max', 'textColor', 'fillColor' ],
            events: [ 'change' ]
        },
        'checkbox-button': {
            keywords: [ 'label', 'true-label', 'false-label', 'disabled', 'name', 'checked' ]
        },
        input: {
            keywords: [ 'value', 'v-model', 'type', 'maxlength', 'minlength', 'sum', 'placeholder', 'clearable', 'disabled', 'size', 'rows', 'name', 'readonly', 'max', 'min', 'step', 'autofocus', 'form', 'label' ],
            slot: [ 'prefix', 'suffix', 'prepend', 'append' ],
            events: [ 'blur', 'focus', 'change', 'input', 'clear' ]
        },
        autocomplete: {
            keywords: [ 'value', 'value-key', 'debounce', 'fetch-suggestions', 'placement', 'popper-append-to-body', 'highlight-first-item', 'hide-loading', 'prefix-icon', 'suffix-icon', 'select-when-unmatched', 'popper-class', 'trigger-on-focus', 'placeholder', 'disabled', 'name', 'label' ],
            slot: [ 'prefix', 'suffix', 'prepend', 'append' ],
            events: [ 'change', 'select' ]
        },
        'input-number': {
            keywords: [ 'value', 'v-model', 'controls', 'controls-position', 'step-strictly', 'precision', 'placeholder', 'disabled', 'size', 'name', 'readonly', 'max', 'min', 'step', 'form', 'label' ],
            events: [ 'change', 'blur', 'focus' ]
        },
        select: {
            keywords: [ 'value', 'v-model', 'multiple', 'disabled', 'value-key', 'size', 'clearable', 'collapse-tags', 'multiple-limit', 'name', 'autocomplete', 'placeholder', 'filterable', 'allow-create', 'filter-method', 'remote', 'remote-method', 'loading', 'loading-text',
                'no-match-text', 'no-data-text', 'popper-class', 'reserve-keyword', 'default-first-option', 'popper-append-to-body', 'automatic-dropdown' ],
            events: [ 'change', 'visible-change', 'remove-tag', 'clear', 'blur', 'focus' ],
            slot: [ 'prefix', 'empty' ]
        },
        option: {
            keywords: [ 'value', 'label', 'disabled' ]
        },
        switch: {
            keywords: [ 'value', 'v-model', 'disabled', 'name', 'active-icon-class', 'inactive-icon-class', 'active-text', 'inactive-text', 'active-value', 'inactive-value', 'active-color', 'inactive-color', 'validate-event' ],
            events: [ 'change' ]
        },
        'time-picker': {
            keywords: [ 'value', 'v-model', 'disabled', 'name', 'readonly', 'editable', 'clearable', 'placeholder', 'size', 'start-placeholder', 'end-placeholder', 'is-range', 'arrow-control',
                'align', 'popper-class', 'picker-options', 'range-separator', 'value-format', 'default-value', 'prefix-icon', 'clear-icon' ],
            events: [ 'change', 'blur', 'focus' ]
        },
        'time-select': {
            keywords: [ 'start', 'end', 'step', 'minTime', 'maxTime' ],
            events: [ 'change', 'blur', 'focus' ]
        },
        'date-picker': {
            keywords: [ 'value', 'v-model', 'disabled', 'name', 'readonly', 'editable', 'clearable', 'placeholder', 'size', 'start-placeholder', 'end-placeholder', 'is-range', 'arrow-control',
                'align', 'popper-class', 'unlink-panels', 'picker-options', 'range-separator', 'value-format', 'default-time', 'default-value', 'prefix-icon', 'clear-icon' ],
            events: [ 'change', 'blur', 'focus' ]
        },
        upload: {
            keywords: [ 'action', 'headers', 'multiple', 'data', 'name', 'with-credentials', 'show-file-list', 'drag', 'accept', 'on-preview', 'on-remove', 'on-success', 'on-error', 'on-progress', 'on-change', 'before-upload',
                'before-remove', 'list-type', 'auto-upload', 'file-list', 'http-request', 'disabled', 'limit', 'on-exceed' ],
            slot: [ 'trigger', 'tip' ]
        },
        form: {
            keywords: [ 'model', 'rules', 'inline', 'label-position', 'label-width', 'label-suffix', 'hide-required-asterisk', 'show-message', 'inline-message', 'status-icon', 'validate-on-rule-change', 'size', 'disabled' ],
            methods: [ 'validate', 'validateField', 'resetFields', 'clearValidate' ],
            events: [ 'validate' ]
        },
        'form-item': {
            keywords: [ 'prop', 'label', 'label-width', 'required', 'rules', 'error', 'show-message', 'inline-message', 'size' ],
            slot: [ 'label' ],
            methods: [ 'resetField', 'clearValidate' ]
        },
        table: {
            keywords: [ 'data', 'height', 'max-height', 'stripe', 'border', 'size', 'fit', 'show-header', 'highlight-current-row', 'current-row-key', 'row-clas-name', 'row-style',
                'cell-class-name', 'cell-style', 'header-row-class-name', 'header-row-style', 'header-cell-class-name', 'header-cell-style', 'row-key', 'empty-text', 'default-expand-all',
                'expand-row-keys', 'default-sort', 'tooltip-effect', 'show-summary', 'sum-text', 'summary-method', 'span-method', 'select-on-indeterminate', 'indent', 'lazy', 'load', 'tree-props'],
            events: [ 'select', 'select-all', 'selection-change', 'cell-mouse-enter', 'cell-mouse-leave', 'cell-click', 'cell-dblclick', 'row-click', 'row-contextmenu', 'row-dblclick',
                'header-click', 'header-contextmenu', 'sort-change', 'filter-change', 'current-change', 'header-dragend', 'expand-change' ],
            methods: [ 'clearSelection', 'toggleRowSelection', 'toggleAllSelection', 'toggleRowExpansion', 'setCurrentRow', 'clearSort', 'clearFilter', 'doLayout', 'sort' ],
            slot: [ 'append' ]
        },
        'table-column': {
            keywords: [ 'type', 'index', 'column-key', 'label', 'prop', 'width', 'min-width', 'fixed', 'render-header', 'sortable', 'sort-method', 'sort-by', 'sort-orders', 'resizable', 'formatter',
                'show-overflow-tooltip', 'align', 'header-align', 'class-name', 'label-class-name', 'selectable', 'reserve-selection', 'filters', 'filter-placement', 'filter-multiple', 'filter-method',
                'filtered-value' ],
            slot: [ 'header' ]
        },
        // navigation
        tabs: {
            keywords: [ 'value', 'v-model', 'type', 'closable', 'addable', 'editable', 'tab-position', 'stretch', 'before-leave' ],
            events: [ 'tab-click', 'tab-remove', 'tab-add', 'edit' ]
        },
        'tab-pane': {
            keywords: [ 'label', 'disabled', 'name', 'closeable', 'lazy' ]
        },
        'dropdown': {
            keywords: [ 'type', 'size', 'split-button', 'placement', 'trigger', 'hide-on-click', 'show-timeout', 'hide-timeout', 'tabindex' ],
            slot: true,
            events: [ 'click', 'command', 'visible-change' ]
        },
        'dropdown-item': {
            keywords: [ 'command', 'disabled', 'divided', 'icon' ]
        },
        dialog: {
            keywords: [ 'visible', 'title', 'width', 'fullscreen', 'top', 'modal', 'modal-append-to-body', 'append-to-body', 'lock-scroll', 'custom-class', 'close-on-click-modal',
                'close-on-press-escape', 'show-close', 'before-close', 'center', 'destroy-on-close'],
            slot: [ 'title', 'footer' ],
            events: [ 'open', 'close', 'opened', 'closed' ]
        },
        popover: {
            keywords: [ 'trigger', 'title', 'content', 'width', 'placement', 'disabled', 'value', 'v-model', 'offset', 'transition', 'visible-arrow',
                'popper-options', 'popper-class', 'open-delay', 'close-delay', 'tabindex' ],
            slot: [ 'reference' ],
            events: [ 'show', 'hide', 'after-enter', 'after-leave' ]
        },
        card: {
            keywords: [ 'header', 'body-style', 'shadow' ]
        }
    }
};