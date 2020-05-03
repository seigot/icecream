$(function() {
	'use strict';

	//title追加
	d3.select('svg')
	    .append('text')
	    .attr('class', 'title')
	    .attr('x', 10)
	    .attr('y', 30)
	    .text("Bubbles of customer's voice");

	// json
	//var file = '/resource/js/customers_voice.json';
	var file = 'customers_voice.json';
	
	// データをセット
	d3.json(file, function(json) {
		var data = json;
		var width = document.querySelector('svg').clientWidth;
		var height = document.querySelector('svg').clientHeight;
		var xRamdom = width * Math.random();
		var yRamdom = height * Math.random();
		var nodesData = [];

		// nodesDataにデータをpush
		// x座標と、y座標はランダム
		for (var i = 0, d = data.length; i < d; i++) {
		    nodesData.push({
			    x: xRamdom,
				y: yRamdom,
				r: data[i].r,
				rev: data[i].review,
				txt: data[i].txt,
				title: data[i].title
				});
		}

		// カラースケール作成
		var colorScale = d3.scaleLinear()
		    .domain([1, 5])
		    .range(['rgba(0,0,255,0.8)', 'rgba(255,105,180,0.8)']);

		// svg要素を配置
		// callでドラッグ時のイベント関数を登録
		var nodeGroup = d3.select('svg')
		    .selectAll('g')
		    .data(nodesData)
		    .enter()
		    .append('g')
		    .call(
			  d3.drag()
			  .on('start', dragstarted)
			  .on('drag', dragged)
			  .on('end', dragended)
			  );

		//gの子要素としてcircleをappend
    nodeGroup
	.append('circle')
	.attr('cx', function(d) {
		return d.x;
	    })
	.attr('cy', function(d) {
		return d.y;
	    })
	.attr('r', function(d) {
		return d.r;
	    })
	.attr('fill', function(d) {
		return colorScale(d.rev);
	    })
	.append('title')
	.text(function(d) {
		return d.title;
	    });

    //gの子要素としてtextをappend
    nodeGroup
	.append('text')
	.attr('x', function(d) {
		return d.x;
	    })
	.attr('y', function(d) {
		return d.y;
	    })
	.attr('text-anchor', 'middle')
	.attr('dominant-baseline', 'middle')
	.style('fill', '#fff')
	.text(function(d) {
		return d.txt;
	    })
	.append('title')
	.text(function(d) {
		return d.title;
	    });

    // forceSimulation設定
    var simulation = d3.forceSimulation()
	.force(
	       'collide', d3.forceCollide().radius(function(d) {
		       return d.r;
		   })
	       )
	.force('charge', d3.forceManyBody())
	.force(
	       'x', d3.forceX()
	       .strength(0.03)
	       .x(width / 2)
	       )
	.force(
	       'y', d3.forceY()
	       .strength(0.03)
	       .y(height / 2)
	       );
    //radius => ノードの半径、defaultは1
    //strength => どのくらいで戻るかの係数、0.0～1.0が推奨

    simulation.nodes(nodesData).on('tick', ticked);

    // forceSimulation 描画更新用関数
    function ticked() {
	nodeGroup.select('circle')
	    .attr('cx', function(d) {
		    return d.x;
		})
	    .attr('cy', function(d) {
		    return d.y;
		});
	nodeGroup.select('text')
	    .attr('x', function(d) {
		    return d.x;
		})
	    .attr('y', function(d) {
		    return d.y;
		});
    }

    // ドラッグ時のイベント関数
    function dragstarted(d) {
	if (!d3.event.active) simulation.alphaTarget(0.3).restart();
	d.fx = d.x;
	d.fy = d.y;
    }
    //alphaTarget => シミュレーションを滑らかに繋げるための係数、0～1を指定できる。低いほうが滑らか

    function dragged(d) {
	d.fx = d3.event.x;
	d.fy = d3.event.y;
    }

    function dragended(d) {
	if (!d3.event.active) simulation.alphaTarget(0);
	d.fx = null;
	d.fy = null;
    }
	    });

	// x軸の設定
	var color = d3.interpolate('rgba(0,0,255,0.8)', 'rgba(255,105,180,0.8)');
	var number = 10;
	var w = 320;
	var h = 80;
	var padding = 20;

	var scale = d3.select('body')
	    .append('svg')
	    .attr('width', w)
	    .attr('height', h)
	    .attr('class', 'scale');

  scale
      .append('text')
      .attr('x', 10)
      .attr('y', 10)
      .text('← 不満');

  scale
      .append('text')
      .attr('x', 270)
      .attr('y', 10)
      .text('満足 →');

  var defs = scale
      .append('defs')
      .append('linearGradient')
      .attr('id', 'gradient');

  var rect = scale
      .append('rect')
      .attr('width', 300)
      .attr('height', 40)
      .attr('x', 10)
      .attr('y', 15)
      .attr('fill', 'url(#gradient)');

  for (var i = 0; i < number; i++) {
    defs
	.append('stop')
	.attr('offset', (i * 100) / number + '%')
	.attr('stop-color', color(i / number));
    defs
	.append('stop')
	.attr('offset', ((i + 1) * 100) / number + '%')
	.attr('stop-color', color((i + 1) / number));
  }

  // x軸追加
  var scaleData = [1, 2, 3, 4, 5];
  var xScale = d3
      .scaleLinear()
      .domain([1, 5])
      .range([0, 300]);
  var xAxis = d3.axisBottom(xScale);

  scale
      .append('g')
      .attr('class', 'axis')
      .attr('transform', 'translate(10,' + (h - padding) + ')')
      .call(xAxis);

  //リサイズ処理
  var content = $('#content');
  $(window).on('resize load', function() {
	  var targetWidth = $(window).width();
	  var targetHeight = $(window).height();
	  content.attr('width', targetWidth);
	  content.attr('height', targetHeight);
      });
    });
