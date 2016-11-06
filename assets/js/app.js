$(document).ready(function()
{
	var $window = $(window);
	$('section[data-type="background"]').each(function()
	{
		var $scroll = $(this);
		var scrollBackground = function()
		{
			var yPos = -($window.scrollTop() / $scroll.data('speed'));
			var coords = '50% ' + yPos + 'px';
			$scroll.css({
				backgroundPosition: coords
			});
		};
		$(window).scroll(scrollBackground);
		scrollBackground();
	});
	
	var html_no_apps = '<div class="alert alert-warning"><h4><strong>Coming Soon</strong></h4><p>There are no public projects available at this time.</p></div>';
	
	var renderApps = function(apps)
	{
		var html_app = '';
		if (apps.length > 0)
		{
			for (var index in apps)
			{
				var app = apps[index];
				html_app = '<div class="row">';
				var mediaItem = 'col-xs-12';
				if (typeof app.icon !== undefined)
				{
					mediaItem = 'col-md-9 col-sm-6 col-xs-12';
					html_app += '<a class="col-md-3 col-sm-6 col-xs-12" style="margin-bottom: 8px;" href="' + app.url + '"><img class="img-thumbnail img-responsive" src="' + app.icon + '" alt="icon"></a>';
				}
				html_app += '<div class="' + mediaItem + '"><h4 class="media-heading"><a href="' + app.url + '">' + app.title + '</a></h4><p>' + app.description + '</p>';
				if (typeof app.tags !== undefined)
				{
					html_app += '<p>';
					for (var tagIndex in app.tags)
					{
						var tag = app.tags[tagIndex];
						var icon_html = '';
						var link_open_html = '';
						var link_close_html = '';
						
						if (typeof tag.icon !== 'undefined')
						{
							var icon = tag.icon.split(':'); // string.split
							if (icon[0] == 'fa') icon_html = '<i class="fa fa-' + icon[1] + '"></i>&nbsp;';
							else if (icon[0] == 'img') icon_html = '<img src="' . icon[1] + '" alt="icon">';
						}
						
						if (typeof tag.url !== 'undefined')
						{
							link_open_html = '<a href="' + tag.url + '">';
							link_close_html = '</a>';
						}

						html_app += link_open_html + '<span class="label label-primary tag">' + icon_html + tag.name + '</span>' + link_close_html;
					}
					html_app += '</p>';
				}
			}
			
		}
		else
		{
			html_app = html_no_apps;
		}
		$('#projects_container').html(html_app);
	};
	
	// Create application list
	$.ajax({
		url: 'assets/data/apps.json?ts=' + Date.now(),
		error: function( jqXHR, textStatus, errorThrown ) {
			// Just show the 'no apps found' message
			renderApps([]);
		},
		success: function( data, textStatus, jqXHR ) {
			renderApps(data);
		}
	});	
});
