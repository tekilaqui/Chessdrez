import os

path = '/home/gus/.gemini/antigravity/scratch/chesstricks/client.js'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

old_block = """    // Sync Threats (Fase 1 Mobile)
    if ($('#threats-panel').is(':visible')) {
        $('#mobile-threats-section').show();
        $('#mobile-threats-list').html($('#threats-list').html());
    } else {
        $('#mobile-threats-section').hide();
    }"""

new_block = """    // Sync Threats (Modular Widget)
    const hasThreats = $('#threats-list').children().length > 0 && $('#threats-panel').is(':visible');
    const $threatsWidget = $('#widget-group-threats');
    if (hasThreats) {
        $threatsWidget.show().addClass('alerting');
        $('#mobile-threats-list-modular').html($('#threats-list').html());
    } else {
        $threatsWidget.hide().removeClass('alerting').removeClass('expanded');
    }"""

if old_block in content:
    new_content = content.replace(old_block, new_block)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Success")
else:
    print("Block not found")
