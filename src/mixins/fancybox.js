import $ from 'jquery'
export default {
  mounted () {
    this.$nextTick(() => {
      const $fancybox = $('[data-fancybox]')
      if ($fancybox.length) {
        $fancybox.fancybox({
          infobar: false,
          buttons: false,
          arrows: false,
          afterLoad: function (instance, current) {
            if (instance.group.length > 1 && current.$content) {
              current.$content.append('<button data-fancybox-prev class="fancybox-button fancybox-button--arrow_left" title="PREV">' +
                '<div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M11.28 15.7l-1.34 1.37L5 12l4.94-5.07 1.34 1.38-2.68 2.72H19v1.94H8.6z"/></svg></div>' +
                '</button><button data-fancybox-next class="fancybox-button fancybox-button--arrow_right" title="NEXT">' +
                '<div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.4 12.97l-2.68 2.72 1.34 1.38L19 12l-4.94-5.07-1.34 1.38 2.68 2.72H5v1.94z"/></svg></div>' +
                '</button>')
            }

            current.$content.append('<button data-fancybox-close class="fancybox-button fancybox-button--close" title="CLOSE">' +
              '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 10.6L6.6 5.2 5.2 6.6l5.4 5.4-5.4 5.4 1.4 1.4 5.4-5.4 5.4 5.4 1.4-1.4-5.4-5.4 5.4-5.4-1.4-1.4-5.4 5.4z"/></svg>' +
              '</button>')
            current.$content.append(`<div class="fancybox-infobar"><span>${current.index + 1}</span>&nbsp;/&nbsp;<span>${instance.group.length}</span></div>`)
          }
        })
      }
    })
  }
}
