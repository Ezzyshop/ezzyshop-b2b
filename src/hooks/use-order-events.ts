import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { getSupportSocket } from "@/api/socket";
import { useShopContext } from "@/contexts/shop-context/shop.context";

interface IOrderEventPayload {
  order_id: string;
  shop_id: string;
  repush?: string;
}

// Short two-tone ping (WebAudio, no asset needed). Only when the tab is visible —
// the mobile app handles ringing natively, the web dashboard just nudges.
const playPing = () => {
  if (document.visibilityState !== "visible") return;
  try {
    const ctx = new AudioContext();
    [880, 1175].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.15, ctx.currentTime + i * 0.18);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.18 + 0.16);
      osc.connect(gain).connect(ctx.destination);
      osc.start(ctx.currentTime + i * 0.18);
      osc.stop(ctx.currentTime + i * 0.18 + 0.18);
    });
    setTimeout(() => ctx.close(), 1000);
  } catch {
    // audio is best-effort (autoplay policies may block it before user interaction)
  }
};

/**
 * Live order updates for the active shop: refresh order lists when a new order
 * arrives or gets accepted/cancelled elsewhere (Telegram, mobile app, another tab).
 */
export const useOrderEvents = () => {
  const queryClient = useQueryClient();
  const { activeShop } = useShopContext();
  const shopId = activeShop?._id;

  useEffect(() => {
    if (!shopId) return;

    const socket = getSupportSocket();

    const invalidate = () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["analytics"] });
    };

    const onOrderNew = (payload: IOrderEventPayload) => {
      if (payload.shop_id !== shopId) return;
      invalidate();
      if (payload.repush !== "true") playPing();
    };

    const onOrderResolved = (payload: IOrderEventPayload) => {
      if (payload.shop_id !== shopId) return;
      invalidate();
    };

    socket.on("order:new", onOrderNew);
    socket.on("order:accepted", onOrderResolved);
    socket.on("order:cancelled", onOrderResolved);

    return () => {
      socket.off("order:new", onOrderNew);
      socket.off("order:accepted", onOrderResolved);
      socket.off("order:cancelled", onOrderResolved);
    };
  }, [shopId, queryClient]);
};
