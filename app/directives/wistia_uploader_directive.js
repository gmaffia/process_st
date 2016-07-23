'use strict'
angular.module('process').directive('wistiaUploader', ['$sce', function($sce) {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'app/views/wistia_uploader.html',
    link: function(scope, element, attributes) {

      scope.uploadProgress = 0;
      scope.isUploading = false;
      scope.displayVideo = false;
      scope.videoSource = null;
      scope.uploadFailed = false;

      $(element).fileupload({
        url: 'https://upload.wistia.com',
        fileInput: $('input:file'),
        singleFileUploads: true,
        sequentialUploads: true,
        limitConcurrentUploads: 1,
        autoUpload: true,
        formData: {
          api_password: "c92230cf44a0fbf635a3e079929131fd5fc1e2d7cf768faeb07e421904a9b51f"
        }
      })
    
      .bind('fileuploadsend', function(e, data) {
        scope.$apply(function() {
          scope.isUploading = true;
          scope.displayVideo = false;
          scope.uploadFailed = false;
          scope.videoSource = null;
          element.find('#preview').empty();
        });
      })
     
      .bind('fileuploadprogress', function(e, data) {
        scope.$apply(function() {
          scope.uploadProgress = parseInt(data.loaded / data.total * 100, 10);
        });
      })

      .bind('fileuploaddone', function(e, data) {
        scope.$apply(function() {
          scope.isUploading = false;
          scope.uploadProgress = 0;
          scope.displayVideo = true;
          scope.videoSource = "http://fast.wistia.net/embed/iframe/" + data.result.hashed_id;
          element.find('#preview').append('<iframe src="' + scope.videoSource + '"></iframe>');
        });
      })

      .bind('fileuploadfail', function(e, data) {
        scope.$apply(function() {
          scope.isUploading = false;
          scope.uploadProgress = 0;
          scope.uploadFailed = data.jqXHR.responseJSON.error;
        });
      });

    }
  }
}]);
