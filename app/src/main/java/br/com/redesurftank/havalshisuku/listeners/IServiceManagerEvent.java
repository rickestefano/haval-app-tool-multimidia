package br.com.redesurftank.havalshisuku.listeners;

import br.com.redesurftank.havalshisuku.models.ServiceManagerEventType;

public interface IServiceManagerEvent {
    void onEvent(ServiceManagerEventType event, Object... args);
}
