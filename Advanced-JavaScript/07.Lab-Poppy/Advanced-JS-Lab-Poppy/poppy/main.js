poppy.pop('success', 'Test', 'success');
poppy.pop('info', 'Test', 'info');
poppy.pop('error', 'Test', 'error');
//poppy.pop('warning', 'Test', 'warning', function() {
//    alert('warning');
//});

poppy.pop('warning', 'Attention!', 'You are our 100th visitor.', redirect);

function redirect() {
    window.location = 'https://www.softuni.bg';
}
