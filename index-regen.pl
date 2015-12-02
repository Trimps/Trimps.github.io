#!/usr/bin/perl
use strict;
use warnings;
use File::Slurp qw/read_file write_file/;

my $master_html = read_file('index-master.html') or die "Can't open index-master.pl: $!";
my $trimps_version = read_file('current-version.txt') or die "Can't open current-version.txt: $!";
chomp $trimps_version;

my @index_files = (
# ---------------------------------------------------------------------------
        {  name => 'index.html', 
           replace => {
            TRIMPSVERSION => " $trimps_version",
            GA_UACODE => '64748869',
            KONGAPI => '',
            BONEHOWTO => '					<div id="mainBoneHowTo">
						You can earn bones as you progress through the world by killing Skeletimps and Megaskeletimps.
					</div>
',
            BONECOLLECT => 'Collect them all!',
            BUYBONES => '',
            BUYSCRIPT => '',
           }
        },
# ---------------------------------------------------------------------------
        { name => 'indexKong.html',
           replace => {
             TRIMPSVERSION => '',
             GA_UACODE => '65049418',
             KONGAPI => '<script type="text/javascript">
var kongregate = parent.kongregateAPI.getAPI();
</script>
',
             BONEHOWTO => <<'END_BONEHOWTO',
					<div id="getBonesBtn" class="boneBtn successColor pointer noselect" style="width: 33vw; display: inline-block" onclick="showPurchaseBones()">
						<span class="kredSpan"><img class="kredImg" src="imgs/kred_single.png"></img></span> Get some more bones</span>						
					</div>
					<br/>
					<span id="bonesFrom">You Can Also Earn Bones In Game By Killing Skeletimps</span>
					<br/>
					<div id="getBundleBtn" class="boneBtn pointer noselect" style="width: 33vw; display: inline-block; font-size: .9em;" onclick="showPurchaseBones(); startBundling()">
						<span class="glyphicon glyphicon-star"></span> Click to Bundle 4 Exotic Imp-orts and get 100 free bones! <span class="glyphicon glyphicon-star"></span>
					</div>
END_BONEHOWTO
            BONECOLLECT => 'You can also bundle 4 together and get some extra bones.',
            BUYBONES => <<'END_BUYBONES',
	<div id="boneWrapper1" style="display: none">
		<div class="row">
			<div class="col-xs-2">		
			</div>
			<div class="col-xs-8">
			<div id="purchaseBonesTitle">
				Purchase Bones
			</div>
			<div id="purchaseBonesDesc">
				Bones can be earned in game or purchased here.<br/>In game, you will earn bones from enemies that randomly spawn in the world
				<div class="boneBuyDesc">
					I love working on this game, but there's still so much to do, and any funds raised through bones will support the continued development of Trimps. Thank you so much for playing!
				</div>
			</div>
			</div>
			<div class="col-xs-2">
					<div class="boneBtn successColor pointer noselect" onclick="hidePurchaseBones()">
							Back to Trader
					</div>
					<div class="boneBtn dangerColor pointer noselect" onclick="hideBones()">
							Close All
					</div>
			</div>
		</div>
		<div id="boneBuyTableContainer">
			<table id="boneBuyTable" class="table">
				<tbody>
					<tr class="pointer noSelect" onclick="kredPurchase('20.bones')">
						<td>
							20 Bones
						</td>
						<td>
							&nbsp;
						</td>
						<td>
							10 <span class="kredSpan"><img class="kredImg" src="imgs/kred_single.png"></img></span>
						</td>
					</tr>
					<tr class="pointer noSelect" onclick="kredPurchase('42.bones')">
						<td>42 Bones</td>
						<td>(Includes +2 bones!)</td>
						<td>20 <span class="kredSpan"><img class="kredImg" src="imgs/kred_single.png"></img></span></td>
					</tr>
					<tr class="pointer noSelect" onclick="kredPurchase('110.bones')">
						<td>110 Bones</td>
						<td>(Includes +10 bones!)</td>
						<td>50 <span class="kredSpan"><img class="kredImg" src="imgs/kred_single.png"></img></span></td>
					</tr>
					<tr class="pointer noSelect" onclick="kredPurchase('230.bones')">
						<td>230 Bones</td>
						<td>(Includes +30 bones!)</td>
						<td>100 <span class="kredSpan"><img class="kredImg" src="imgs/kred_single.png"></img></span></td>
					</tr>
					<tr class="pointer noSelect" onclick="kredPurchase('480.bones')">
						<td>480 Bones</td>
						<td>(Includes +80 bones!)</td>
						<td>200 <span class="kredSpan"><img class="kredImg" src="imgs/kred_single.png"></img></span></td>
					</tr>
					<tr id="bundleRow" class="pointer noSelect" onclick="startBundling()">
						<td>4 Exotic Imp-orts of your choice<br/>AND 100 bones</td>
						<td>(Includes +100 bones!)</td>
						<td>100 <span class="kredSpan"><img class="kredImg" src="imgs/kred_single.png"></img></span></td>
					</tr>
				</tbody>
			</table>
			</div>
		</div>
		<div id="boneWrapper2" style="display: none">
			<div class="row">
				<div class="col-xs-3">
				
				</div>
				<div class="col-xs-6" style="background-color: #e1e1e1">
					<div id="bundleTitle">Select 4 Exotic Imports!</div>
					<div class="boneBuyDesc">Click once to select an Imp, click again to deselect</div>
					<div id="importsPreview1">
						<div class="importLocation">Spawns in World</div>
						<table class="table importsTable" id="importsTableWorld1">						
						</table>
						<div class="importLocation table-hover">Spawns in Maps</div>
						<table class="table importsTable" id="importsTableMaps1">					
						</table>
					</div>
					<div class="boneBtn pointer noSelect" id="addBundleBtn" onclick="purchaseBundleClicked()"></div>
				</div>
				<div class="col-xs-3">
					<div class="boneBtn successColor pointer noselect" onclick="hidePurchaseBones()">
							Back to Trader
					</div>
					<div class="boneBtn dangerColor pointer noselect" onclick="hideBones()">
							Close All
					</div>
				</div>
			</div>

		</div>
END_BUYBONES
                BUYSCRIPT => <<'END_BUYSCRIPT',
	<script type="text/javascript">
		document.body.addEventListener('DOMMouseScroll', onWheel, true);
		document.body.addEventListener('mousewheel', onWheel, true);
		var buyCol = document.getElementById("buyCol");
		var buyHere = document.getElementById("buyContainer");
		function onWheel (e){
			if (e.target.parentElement.offsetParent === buyCol){
			try{
			if((e.wheelDelta < 0 && (buyHere.scrollTop === (buyHere.scrollHeight - buyHere.offsetHeight))) || (e.wheelDelta > 0 && (buyHere.scrollTop == 0))){
				e.preventDefault();
				e.stopPropagation();
				}
			}
			catch(err){
			
			}
			}
		}
	</script>
END_BUYSCRIPT
                
           }
        },
);

for my $filedef (@index_files) {
    my $html = $master_html;
    my $replace_list = $filedef->{replace};
    my $regex = '<!--(' . join('|', sort keys %$replace_list) . ')-->\n?';
    $html =~ s/$regex/$replace_list->{$1}/ge;
    write_file $filedef->{name}, $html;
    print "Generated: $filedef->{name}\n";
}
