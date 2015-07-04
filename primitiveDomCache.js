/* 		Trimps
		Copyright (C) 2015 Zach Hood

		This program is free software: you can redistribute it and/or modify
		it under the terms of the GNU General Public License as published by
		the Free Software Foundation, either version 3 of the License, or
		(at your option) any later version.

		This program is distributed in the hope that it will be useful,
		but WITHOUT ANY WARRANTY; without even the implied warranty of
		MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
		GNU General Public License for more details.

		You should have received a copy of the GNU General Public License
		along with this program (if you are reading this on the original
		author's website, you can find a copy at
		<https://googledrive.com/host/0BwflTm9l-5_0fnFvVzI2TW1hU3J6TGc2NEt6VFc4N0hzaWpGX082LWY2aDJTSV85aVRxYVU/license.txt>). If not, see
		<http://www.gnu.org/licenses/>. */
// primitive element caching
// While I recommend using jQuery for this kind of thing, this should improve performance a little.

var gameElements = {
	nodes : {},
	observer:new MutationObserver(
		function(mutations)
		{
			mutations.forEach(
				function(mutation)
				{
					for(var i in mutation.removedNodes)
					{
						var node = mutation.removedNodes[i];
						if(node.id && gameElements.nodes[node.id])
						{
							delete(gameElements.nodes[node.id]);
						}
					}
				}
			);
		}
	),
	observerOptions:{subtree:false, childList:true},
	getElementById:function(id)
	{
		if(!id)
		{
			return null;
		}
		if(this.nodes[id])
		{
			return this.nodes[id];
		}
		console.log('searching for element' +id);
		var elem = document.getElementById(id);
		
		if(elem === null)
		{
			console.log('Element '+id+' not found');
			return null;
		}
		
		console.log('returning element');
		this.observer.observe(elem.parentNode, this.observerOptions);
		
		this.nodes[id] = elem;
		return elem;
	},
	removeElement:function(id)
	{
		
	}
};