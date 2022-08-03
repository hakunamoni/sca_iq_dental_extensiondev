define("IQ.PO.ListHeader.View", [
  "iq_po_list_header_view.tpl",
  "ListHeader.View",
  "Backbone",
  "Utils",
  "UrlHelper",
  "AjaxRequestsKiller",
  "underscore",
  "jQuery",
], function (
  iq_po_list_header_view,
  ListHeaderView,
  BackboneView,
  Utils,
  UrlHelper,
  AjaxRequestsKiller,
  _,
  $
) {
  "use strict";
  return {
    loadModule: function (container) {
      _.extend(ListHeaderView.prototype, {
        template: iq_po_list_header_view,
        initialize: _.wrap(ListHeaderView.prototype.initialize, function (fn) {
          fn.apply(this, _.toArray(arguments).slice(1));

          this.searchable = _.toArray(arguments).slice(1)[0].searchable;
        }),

        // @property {Object} events
        events: _.extend(ListHeaderView.prototype.events, {
          'change [data-type="list-header-view-sku-input"]': "skuInputHandler",
          'keyup [data-type="list-header-view-sku-input"]': "skuInputHandler",
        }),

        // when rendering we need to check
        // if there are options already set up in the url
        // render: function () {
        render: _.wrap(ListHeaderView.prototype.render, function (fn) {
          console.log("this:render", this);

          // if there are no items in the collection, avoid rendering the list header
          if (this.totalCount === 0) {
            return;
          }

          if (
            !this.selectedFilter &&
            !this.selectedSort &&
            !this.order &&
            !this.sku &&
            !this.selectedRange &&
            !this.selectedDisplay
          ) {
            this.setSelecteds();

            // after we set the current status
            // we update the collection
            if (!this.avoidFirstFetch) {
              this.updateCollection();
            }
          }

          this._render();

          this.updateCalendarButtons();

          if (this.options.customFilterHandler) {
            this.options.customFilterHandler(
              this.selectedFilter,
              this.getElementSort()
            );
          }
          console.log("this:render this.options", this.options);

          // fn.apply(this, _.toArray(arguments).slice(1));
        }),

        // @method updateCollection
        // the collection used by the view MUST have an update method
        // this method is going to be called whenever a sort/filter value changes
        // @return {ListHeader.View} Returns itself
        // updateCollection: function () {
        updateCollection: _.wrap(
          ListHeaderView.prototype.updateCollection,
          function (fn) {
            // fn.apply(this, _.toArray(arguments).slice(1));
            let range = null;
            const { collection } = this;

            console.log("this:updateCollection", this);
            console.log("this:collection", collection);

            if (this.selectedRange) {
              // @class RangeFilter
              // If there is no date selected i keep the range empty in order to get "transactions" dated in the future
              range = {
                // @property {String} from
                from:
                  this.selectedRange.from ||
                  (this.allowEmptyBoundaries
                    ? ""
                    : this.rangeFilterOptions.fromMin),
                // @property {String} to
                to:
                  this.selectedRange.to ||
                  (this.allowEmptyBoundaries
                    ? ""
                    : this.rangeFilterOptions.toMax),
              };
            }
            // @lass Collection.Filter
            collection.update &&
              collection.update(
                {
                  // @property {value:String} filter
                  filter: this.selectedFilter,
                  // @property {RangeFilter} range
                  range: range,
                  // @property {value:String} sort
                  sort: this.selectedSort,
                  // @property {String} order
                  order: this.order,
                  sku: this.sku,
                  page: this.page,
                  // @property {Number} killerId
                  killerId: AjaxRequestsKiller.getKillerId(),
                },
                this
              );
            console.log("this:collection.update", collection);

            // @class ListHeader.View
            return this;
            // return fn.apply(this, _.toArray(arguments).slice(1));
          }
        ),

        // @method setSelecteds set the selected rows from url information
        // setSelecteds: function () {
        setSelecteds: _.wrap(
          ListHeaderView.prototype.setSelecteds,
          function (fn) {
            const url_options = Utils.parseUrlOptions(
              Backbone.history.fragment
            );

            // this.selectedFilter = this.getFilterFromUrl(url_options.filter);
            // this.selectedRange = this.getInitialDateRange(url_options.range) || {};
            // this.selectedSort = this.getSortFromUrl(url_options.sort);
            // this.order = this.getOrderFromUrl(url_options.order);
            this.sku = url_options.sku;
            // this.page = this.getPageFromUrl(url_options.page);

            console.log("this:setSelecteds", this);
            // this.selectedDisplay = this.getDisplayFromUrl(url_options.display);
            fn.apply(this, _.toArray(arguments).slice(1));
          }
        ),

        // @method skuInputHandler method called when sku input search change
        skuInputHandler: function (e) {
          // if (e.target.value.length < 3) {
          //   return;
          // }
          // sets the selected filter
          this.sku = e.target.value;
          // updates the url and the collection
          this.updateUrl();
        },

        // @method updateUrl Updates the URL with the new applied filters
        // @return {ListHeader.View} Return itself
        updateUrl: _.wrap(ListHeaderView.prototype.updateUrl, function (fn) {
          // if the sku input is valid
          //   change it for the input sku value
          // else remove the sku parameter
          var url = Backbone.history.fragment;

          url =
            this.sku && this.sku.length > 2
              ? UrlHelper.UrlHelper.setUrlParameter(url, "sku", this.sku)
              : UrlHelper.UrlHelper.removeUrlParameter(url, "sku");

          Backbone.history.navigate(url, { trigger: false });

          console.log("this:updateUrl", url);

          return fn.apply(this, _.toArray(arguments).slice(1));
          // return this.updateCollection();
        }),

        getContext: _.wrap(ListHeaderView.prototype.getContext, function (fn) {
          var context = fn.apply(this, _.toArray(arguments).slice(1));

          context.searchable = this.searchable;

          return context;
        }),
      });
    },
  };
});
