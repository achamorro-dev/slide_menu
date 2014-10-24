function ApplicationWindow(osname){
	//Window to export
	var self = Ti.UI.createWindow({
			backgroundColor: '#EEEEEE',
			color: '#FFFFFF',
			exitOnClose: true,
			height: 'auto',
			navBarHidden: true,
			width: 'auto',
			_moving: false,
			_startx: 0,
			_endx: 0
		}),
		//Custom parameters
		firstColor='#A30000',
		secondColor='#840000',
		textColor='#FFFFFF',
	
	
		//HEADER O ACTION BAR
		header = Ti.UI.createView({
	    	backgroundColor: firstColor,
	    	color: textColor,
			height: 50,
			left: 0,
			top: 0,
			width: 'auto',
			zIndex: 10
		}),
		content = Ti.UI.createScrollView({
			height: 'auto',
			showVerticalScrollIndicator: true,
			top: 60,
			width: 'auto'
		}),
		menuLauncher = Ti.UI.createView({
			backgroundColor: firstColor,
			height: 50,
			left: 0,
			top: 0,
			width: 160
		}),
		iconHeader = Ti.UI.createButton({
			backgroundImage: '/images/menu.png',
			left: 10,
			width: 30
		}),
		titleHeader = Ti.UI.createLabel({
			color: textColor,
			font: {
				fontSize: '20dp',
				fontFamily: 'Roboto-Light'
			},
			left: '50',
			text: 'App title',
			textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT
		}),
		//MENU
		menuItems = [
			['MENU ITEM 0', '', 'App title'],
			['MENU ITEM 1', '', 'Item 1'],
			['MENU ITEM 2', '', 'Item 2'],
			['MENU ITEM 3', '', 'Item 3'],
			['MENU ITEM 4', '', 'Item 4'],
			['MENU ITEM 5', '', 'Item 5'],
			['MENU ITEM 6', '', 'Item 6'],
			['MENU ITEM 7', '', 'Item 7'],
			['MENU ITEM 8', '', 'Item 8'],
			['MENU ITEM 9', '', 'Item 9'],
			['MENU ITEM 10', '', 'Item 10'],
			['MENU ITEM 11', '', 'Item 11'],
			['MENU ITEM 12', '', 'Item 12'],
		],
		menuRows = [],
		menuView = Ti.UI.createView({
			height: 'auto',
			left: -200,
			top: 50,
			width: 200,
			zIndex: 9,
			_toggle: false
		}),
		menuTable = Ti.UI.createTableView({
			backgroundColor: firstColor,
			height: 'auto',
			separatorColor: 'transparent',
			width: 'auto'
		}),
		menuRows = [];
		
	self.addEventListener('swipe',function(e){
		clickMenu(e.direction);
	});
		
	//Adding menu options
	for(x in menuItems){
		var row = Ti.UI.createTableViewRow({
				backgroundColor: firstColor,
				className: 'menuRow',
				height: 48,
				objName: 'menuRow',
				selectedBackgroundColor: secondColor
			}),
			rowLabel = Ti.UI.createLabel({
				backgroundColor: firstColor,
				color: textColor,
				font : {
					fontFamily: 'Roboto-Light',
					fontSize: '20dp'
				},
				height: 47,
				text: menuItems[x][0],
				textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
				width: 200,
				_titleView: menuItems[x][2],
				_viewToShow: menuItems[x][1]
			}),
			borderBottom = Ti.UI.createView({
				backgroundColor: secondColor,
				bottom: 0,
				height: 1,
				width: 200
			});
		row.add(rowLabel);
		row.add(borderBottom);
		row.addEventListener('click',menuItemFunction);
		menuRows.push(row);
	}
	menuTable.setData(menuRows);
	
	//ADDS ZONE
	//iOS hack to center
	if(osname != 'android'){
		iconHeader.top = '40%';
		titleHeader.top = '45%';
	}
	//Adding elements to header
	menuLauncher.add(iconHeader);
	menuLauncher.add(titleHeader);
	header.add(menuLauncher);
	//Adding elements to menu
	menuView.add(menuTable);
	//Adding elements to window
	self.add(header);
	self.add(menuView);
	self.add(content);
	
	//EVENTS AND FUNCTIONS
	//Toogle menu
	
	menuLauncher.addEventListener('click',function(event){
		clickMenu(null);
	});
	
	function clickMenu(direction){
		menuLauncher.animate({
		    backgroundColor: secondColor,
		    duration : 200,
		    autoreverse : true,
	    });
		//Menu is hidden
		if(menuView._toggle === false && (direction==null || direction=='right')){
			iconHeader.animate({
				left: -15,
				duration: 200
			});
			menuView.animate({
				left: 0,
				duration: 200,
				curve:Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
			});
			menuView._toggle=true;
		}else if(direction==null || direction=='left'){
			menuView.animate({
				left: -200,
				duration: 200,
				curve:Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
			});
			iconHeader.animate({
				left: 10,
				duration: 200
			});
			menuView._toggle=false;
		};
		
	}
	
	//Function to give functionality to menu items
	function menuItemFunction(e){
		//Animate background to menu item
		e.source.animate({
		    backgroundColor: secondColor,
		    duration : 200,
		    autoreverse : true,
	    });
		//Hide menuView
		menuView.animate({
			left: -200,
			duration: 200,
			curve:Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
		});
		//Move menu icon
		iconHeader.animate({
			left: 10,
			duration: 200
		});
		//Change title to window and deactivate menu flag
		titleHeader.text=e.source._titleView;
		menuView._toggle=false;
	};
	
	
	return self;
}

module.exports = ApplicationWindow;
